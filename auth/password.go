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
	"github.com/pborman/uuid"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
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

type createUser struct {
	Username       string `json:"username"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	PasswordRepeat string `json:"password_repeat"`
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
	logging.GetLogger().Debug("login user by password")
	var payload loginUser
	decoder := json.NewDecoder(r.Body)
	if decodeErr := decoder.Decode(&payload); decodeErr != nil {
		logging.GetLogger().Error("error dezerializing request body", zap.Error(decodeErr))
		return auth.User{}, errors.New("Error during login, please try again later")
	}

	user := GetUserByNameOrMail(payload.Login)

	errInvalidUser := errors.New("Username or password does not match")
	if user != nil {
		logging.GetLogger().Debug("found user, check password", zap.String("user", user.Username))
		if !p.checkPasswordForUser(payload.Password, *user) {
			logging.GetLogger().Debug("password does not match", zap.String("user", user.Username))
			return auth.User{}, errInvalidUser
		}

		if user.AccountStatus != auth.ACCOUNT_STATUS_EMAIL_VERIFIED {
			return auth.User{}, errors.New("Email must be verified first")
		}

		logging.GetLogger().Debug("user logged in successfully", zap.String("user", user.Username))
		return *user, nil
	}

	logging.GetLogger().Debug("user to login not found", zap.String("login", payload.Login))
	return auth.User{}, errInvalidUser
}

func (p PasswordAuthProvider) CreateUser(w http.ResponseWriter, r *http.Request) (auth.User, error) {
	c := config.GetConfiguration()
	if c.Auth.RegistrationDisabled {
		return auth.User{}, errors.New("User could not be created since registration is disabled")
	}

	userInformation, decodeErr := p.decodeBody(w, r)
	if decodeErr != nil {
		return auth.User{}, decodeErr
	}

	if existErr := CheckUsernameAndEmail(userInformation.Username, userInformation.Email); existErr != nil {
		if existErr == ErrMailInUse {
			return auth.User{}, errors.New("Mail already in use")
		} else if existErr == ErrUsernameInUse {
			return auth.User{}, errors.New("Username already in use")
		}
	}

	if userInformation.Password != userInformation.PasswordRepeat {
		return auth.User{}, errors.New("Passwords do not match")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userInformation.Password), bcrypt.DefaultCost)

	if err != nil {
		logging.GetLogger().Error("error during password hashing", zap.Error(err))
	}

	user := GetUserWithMinimalInformation()
	user.Username = userInformation.Username
	user.DisplayName = userInformation.Username
	user.Email = userInformation.Email
	user.Password = string(hashedPassword)
	user.AccountStatus = auth.ACCOUNT_STATUS_CREATED
	user.EmailActivationCode = uuid.NewRandom().String()
	user.AuthProvider = p.GetIdentifier()

	schema.GetDatabase().Create(&user)
	user.QueueSendActivationMail()

	return user, nil
}

func (p PasswordAuthProvider) decodeBody(w http.ResponseWriter, r *http.Request) (createUser, error) {
	var payload createUser
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&payload)
	if err != nil {
		logging.GetLogger().Error("error during request decoding for creating a new user")
		return createUser{}, errors.New("Cannot create user. Please try again later")
	}
	return payload, nil
}

func (p PasswordAuthProvider) checkPasswordForUser(password string, user auth.User) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}
