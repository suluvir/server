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

package oauth

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	auth2 "github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/web/dependencyLoader"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/meta"
	"go.uber.org/zap"
	"net/http"
)

const google = "google"

const checkUrl = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=%s"

type GoogleProvider struct {
}

type googleSigninApiData struct {
	Email   string `json:"email"`
	IdToken string `json:"id_token"`
	Image   string `json:"image"`
	Login   string `json:"login"`
}

func init() {
	environment.RegisterCallback(applyGoogleProvider, environment.ROUTER_INITIALIZED)
}

func applyGoogleProvider() {
	provider := config.GetConfiguration().Oauth[google]
	if provider.Enabled {
		AddProvider(google, GoogleProvider{})
		dependencyLoader.AddExternalJavascript("https://apis.google.com/js/platform.js")
		meta.AddPageMetadata(meta.Metadata{
			Name:    "google-signin-client_id",
			Content: fmt.Sprintf("%s.apps.googleusercontent.com", provider.ClientID),
		})
	}
}

func (g GoogleProvider) HandlerFunc(w http.ResponseWriter, r *http.Request) {
	var payload googleSigninApiData

	decoder := json.NewDecoder(r.Body)
	defer r.Body.Close()

	if decoder.Decode(&payload) != nil {
		api.SendJsonError(w, http.StatusBadRequest, "")
		return
	}

	user, err := auth.GetUserForAuthProvider(payload.Email, google)
	if err != nil {
		logging.GetLogger().Error("user for different auth provider already exists", zap.Error(err))
		api.SendJsonError(w, http.StatusBadRequest, "A user for this email already exists")
		return
	}

	check := g.CheckGoogleUser(payload)
	if check != nil {
		logging.GetLogger().Error("error checking the google user", zap.Error(check))
	}

	if user == nil {
		if check != nil {
			api.SendJsonError(w, http.StatusBadRequest, "Given user is invalid")
			return
		}
		user = g.CreateUser(payload)
	}

	if check != nil {
		api.SendJsonError(w, http.StatusBadRequest, "Given user is invalid")
		return
	}
	auth.LoginUser(w, r, *user)
	api.SendJsonError(w, http.StatusOK, "")
}

// CheckGoogleUser checks, if the given user is a valid google user
func (g GoogleProvider) CheckGoogleUser(data googleSigninApiData) error {
	logging.GetLogger().Debug("check google user", zap.String("login", data.Login))
	url := fmt.Sprintf(checkUrl, data.IdToken)
	response, err := http.Get(url)
	if err != nil {
		return err
	}
	if response.StatusCode != http.StatusOK {
		return errors.New(fmt.Sprintf("Got response != 200: %d", response.StatusCode))
	}
	logging.GetLogger().Debug("check google user successful")
	return nil
}

// CreateUser creates the suluvir user from google signin api data
func (g GoogleProvider) CreateUser(data googleSigninApiData) *auth2.User {
	user := auth.GetUserWithMinimalInformation()
	user.DisplayName = data.Login
	user.Email = data.Email
	user.AccountStatus = auth2.ACCOUNT_STATUS_EMAIL_VERIFIED
	user.Username = data.Email
	user.AuthProvider = google

	schema.GetDatabase().Create(&user)

	return &user
}
