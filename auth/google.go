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
	"fmt"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/util"
	"go.uber.org/zap"
	"net/http"
)

const google_auth_provider = "google"

const google_check_url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=%s"

type googleProviderPayload struct {
	Email   string `json:"email"`
	IdToken string `json:"id_token"`
	Image   string `json:"image"`
	Login   string `json:"login"`
}

type GoogleAuthProvider struct {
	Provider
}

func init() {
	environment.RegisterCallback(func() {
		AddProvider(GoogleAuthProvider{})
	}, environment.START_SERVICES)
}

func (g GoogleAuthProvider) GetIdentifier() string {
	return google_auth_provider
}

func (g GoogleAuthProvider) LoginUser(w http.ResponseWriter, r *http.Request) (auth.User, error) {
	logging.GetLogger().Debug("login user by google auth")

	var payload googleProviderPayload
	util.MultipleReadJsonParse(r, &payload)

	if checkErr := g.checkPayload(payload); checkErr != nil {
		logging.GetLogger().Warn("error during google login check", zap.Error(checkErr))
		return auth.User{}, errors.New("Error during login, please try again later")
	}

	user, getErr := GetUserForAuthProvider(payload.Email, g.GetIdentifier())
	if getErr != nil {
		// something is wrong with the given user, but he does not NOT exist (like, he may exist or not...)
		logging.GetLogger().Error("error during user login", zap.Error(getErr))
		return auth.User{}, errors.New("This mail address is already in use")
	}

	if user == nil {
		logging.GetLogger().Info("user for google signin does not exist, creating him",
			zap.String("mail", payload.Email))
		return g.CreateUser(w, r)
	}

	return *user, nil
}

func (g GoogleAuthProvider) CreateUser(w http.ResponseWriter, r *http.Request) (auth.User, error) {
	c := config.GetConfiguration()
	if c.Auth.RegistrationDisabled {
		return auth.User{}, errors.New("User could not be created since registration is disabled")
	}

	user := GetUserWithMinimalInformation()

	var data googleProviderPayload
	util.MultipleReadJsonParse(r, &data)

	if existErr := CheckUsernameAndEmail(data.Email, data.Email); existErr != nil {
		if existErr == ErrMailInUse {
			return auth.User{}, errors.New("Mail already in use")
		} else if existErr == ErrUsernameInUse {
			return auth.User{}, errors.New("Username already in use")
		}
	}

	if user, getErr := GetUserForAuthProvider(data.Email, g.GetIdentifier()); getErr != nil || user != nil {
		logging.GetLogger().Warn("cannot create google user. user either exists or error during access",
			zap.Error(getErr))
		return auth.User{}, errors.New("Cannot create user. Please try again later")
	}

	if checkErr := g.checkPayload(data); checkErr != nil {
		logging.GetLogger().Warn("error while checking user information", zap.Error(checkErr),
			zap.String("email", data.Email))
		return auth.User{}, errors.New("Cannot create user. Please try again later")
	}

	user.DisplayName = data.Login
	user.Email = data.Email
	// we assume that google has already checked the mail address
	user.AccountStatus = auth.ACCOUNT_STATUS_EMAIL_VERIFIED
	user.Username = data.Email
	user.AuthProvider = g.GetIdentifier()

	schema.GetDatabase().Create(&user)

	return user, nil
}

func (g GoogleAuthProvider) checkPayload(data googleProviderPayload) error {
	logging.GetLogger().Debug("check google user", zap.String("login", data.Login))
	url := fmt.Sprintf(google_check_url, data.IdToken)
	logging.GetLogger().Debug("call url", zap.String("url", url))
	response, err := http.Get(url)
	if err != nil {
		return err
	}
	if response.StatusCode != http.StatusOK {
		return errors.New(fmt.Sprintf("Got response != 200: %d", response.StatusCode))
	}
	// TODO check response json
	logging.GetLogger().Debug("check google user successful")
	return nil
}
