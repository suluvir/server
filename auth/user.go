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
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema/auth"
	"github.com/uber-go/zap"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

// TODO improve secret
var store = sessions.NewCookieStore([]byte("some very secret value"))

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
	session, err := store.Get(r, "suluvir-user-session")
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   0,
		HttpOnly: true,
	}

	return session, err
}

func GetUserForSession(w http.ResponseWriter, r *http.Request) (*auth.User, error) {
	session, err := GetUserSession(r)
	if err != nil {
		logging.GetLogger().Error("error during session initialization", zap.Error(err))
		return nil, err
	}
	val := session.Values["user"]
	user, ok := val.(*auth.User)
	if !ok {
		return nil, errors.New("object stored in session is no user")
	}

	session.Save(r, w)

	return user, nil
}
