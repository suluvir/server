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
	"errors"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema/auth"
	"go.uber.org/zap"
	"net/http"
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
