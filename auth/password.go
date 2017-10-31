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
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema/auth"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

const password_auth_provider = "suluvir"

type loginUser struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

func init() {
	environment.RegisterCallback(func() {
		AddProvider(PasswordAuthProvider{})
	}, environment.START_SERVICES)
}

type PasswordAuthProvider struct {
	Provider
}

func (p PasswordAuthProvider) GetIdentifier() string {
	return password_auth_provider
}

func (p PasswordAuthProvider) LoginUser(w http.ResponseWriter, r *http.Request) (auth.User, error) {
	var payload loginUser
	decoder := json.NewDecoder(r.Body)
	if decodeErr := decoder.Decode(&payload); decodeErr != nil {
		logging.GetLogger().Error("error dezerializing request body", zap.Error(decodeErr))
		return auth.User{}, errors.New("Error during login, please try again later")
	}

	user := GetUserByNameOrMail(payload.Login)

	errInvalidUser := errors.New("Username or password does not match")
	if user != nil {
		if !p.checkPasswordForUser(payload.Password, *user) {
			return auth.User{}, errInvalidUser
		}

		if user.AccountStatus != auth.ACCOUNT_STATUS_EMAIL_VERIFIED {
			return auth.User{}, errors.New("Email must be verified first")
		}

		return *user, nil
	}

	return auth.User{}, errInvalidUser
}

func (p PasswordAuthProvider) LogoutUser(w http.ResponseWriter, r *http.Request) {

}

func (p PasswordAuthProvider) CreateUser(w http.ResponseWriter, r *http.Request) (auth.User, error) {
	return auth.User{}, nil
}

func (p PasswordAuthProvider) checkPasswordForUser(password string, user auth.User) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err != nil
}
