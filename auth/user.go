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
	"github.com/gorilla/sessions"
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

// TODO improve secret
var store = sessions.NewCookieStore([]byte("a"))

func CreateUser(name string, email string, password string) auth.User {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		logging.GetLogger().Error("error during password hashing", zap.Error(err))
	}

	return auth.User{
		Username: name,
		Email:    email,
		Password: string(hashedPassword),
	}
}

func GetUserSession(r *http.Request) (*sessions.Session, error) {
	session, err := store.Get(r, "suluvir")
	session.Options = &sessions.Options{
		Path:     "/",
		HttpOnly: true,
	}
	return session, err
}

func MustGetUserSession(r *http.Request) *sessions.Session {
	session, err := GetUserSession(r)
	if err != nil {
		logging.GetLogger().Error("error while retrieving user session", zap.Error(err))
	}
	return session
}

func GetUserForSession(w http.ResponseWriter, r *http.Request) (*auth.User, error) {
	session, err := GetUserSession(r)
	if err != nil {
		logging.GetLogger().Error("error during session initialization", zap.Error(err))
		return nil, err
	}
	val := session.Values["user"]
	username, ok := val.(string)
	if !ok {
		return nil, errors.New("object stored in session is no string")
	}

	var user auth.User
	schema.GetDatabase().Where("username = ?", username).First(&user)

	if user.Username != "" {
		logging.GetLogger().Debug("restored user for session", zap.String("user name", user.Username))
	}

	return &user, nil
}

func MustGetUserForSession(w http.ResponseWriter, r *http.Request) *auth.User {
	user, err := GetUserForSession(w, r)
	if err != nil {
		logging.GetLogger().Error("error getting user for session", zap.Error(err))
	}
	return user
}

func LoginUser(w http.ResponseWriter, r *http.Request, user auth.User, password string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))

	if err == nil {
		session, getErr := GetUserSession(r)
		if getErr != nil {
			logging.GetLogger().Error("error while getting the user session", zap.Error(getErr))
			return getErr
		}

		session.Values["user"] = user.Username
		saveErr := session.Save(r, w)
		if saveErr != nil {
			logging.GetLogger().Error("error while saving the users session", zap.Error(saveErr))
			return saveErr
		}
	}

	return err
}

func LogoutUser(w http.ResponseWriter, r *http.Request) {
	session := MustGetUserSession(r)
	delete(session.Values, "user")

	session.Save(r, w)
}

func GetUserDatabase(w http.ResponseWriter, r *http.Request) *gorm.DB {
	user := MustGetUserForSession(w, r)
	return schema.GetDatabase().Where("user_id = ?", user.ID)
}
