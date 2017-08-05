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
	"github.com/gorilla/sessions"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
	"net/http"
)

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
