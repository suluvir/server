// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package auth

import (
	"encoding/json"
	"errors"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"go.uber.org/zap"
	"net/http"
	"time"
)

var providers = map[string]*Provider{}

type Provider interface {
	// GetIdentifier returns a unique identifier for this provider. It MUST be always the same
	GetIdentifier() string
	// LoginUser tries to login the user with the information given in the request. The response writer is passed
	// in for setting cookies etc. When the user cannot be logged in, the function MUST return a detailed error message,
	// as this message will be visible for the user
	LoginUser(w http.ResponseWriter, r *http.Request) (auth.User, error)
	// LogoutUser logs out the user. It shouldn't fail
	LogoutUser(w http.ResponseWriter, r *http.Request)
	// CreateUser creates the new user in the database. The `AuthProvider` column MUST be filled with the same string
	// that is returned for `GetIdentifier`. The error returned MUST contain a detailed error message, as this message
	// will be visible for the user
	CreateUser(w http.ResponseWriter, r *http.Request) (auth.User, error)
}

type providerJsonInformation struct {
	Provider     string `json:"provider"`
	StayLoggedIn bool   `json:"stay_logged_in"`
}

// AddProvider adds a new authentication provider. Add providers in the `START_SERVICES` startup phase. This function
// will return an error if the provider cannot be added. The error message will contain detailed information about the
// reason
func AddProvider(provider Provider) error {
	id := provider.GetIdentifier()
	if providers[id] != nil {
		err := errors.New("cannot add provider, a different provider with the same id is already registered")
		logging.GetLogger().Error("error adding auth provider, same id is already registered",
			zap.String("id", id), zap.Error(err))
		return err
	}
	providers[id] = &provider
	logging.GetLogger().Info("add auth provider", zap.String("id", id))
	return nil
}

// MakeProviderLogin logs in the user by calling the correct provider to to the login
func MakeProviderLogin(w http.ResponseWriter, r *http.Request) (error, int) {
	decoder := json.NewDecoder(r.Body)
	var payload providerJsonInformation
	errInternalError := errors.New("Internal server error, please try again later")
	if decodeErr := decoder.Decode(&payload); decodeErr != nil {
		logging.GetLogger().Error("error during provider login", zap.Error(decodeErr))
		return errInternalError, http.StatusInternalServerError
	}

	provider := providers[payload.Provider]
	if provider == nil {
		logging.GetLogger().Error("provider given is invalid", zap.String("provider", payload.Provider))
		return errors.New("Given authentication provider is invalid"), http.StatusUnprocessableEntity
	}

	user, loginErr := (*provider).LoginUser(w, r)
	if loginErr != nil {
		time.Sleep(time.Second)
		return loginErr, http.StatusForbidden
	}

	if payload.StayLoggedIn {
		MakePersistentSession(w, r, user)
	}

	session, getErr := GetUserSession(r)
	if getErr != nil {
		logging.GetLogger().Error("error while getting the user session", zap.Error(getErr))
		return errInternalError, http.StatusInternalServerError
	}

	session.Values["user"] = user.Username

	if saveErr := session.Save(r, w); saveErr != nil {
		logging.GetLogger().Error("error while saving the users session", zap.Error(saveErr))
		return errInternalError, http.StatusInternalServerError
	}

	user.ActiveAt = time.Now()
	schema.GetDatabase().Save(&user)

	logging.GetLogger().Info("login for user", zap.String("user", user.Username))

	return nil, http.StatusOK
}
