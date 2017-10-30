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
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"go.uber.org/zap"
	"net/http"
	"time"
)

const persistentSessionCookieName = "suluvir-persistent-session"
const sessionAge = 30 * 24 * time.Hour // one month (nanoseconds)
const cookieMaxAge = 60 * 60 * 24 * 30 // one month (seconds)

func GetUserSession(r *http.Request) (*sessions.Session, error) {
	session, err := store.Get(r, "suluvir")
	session.Options = &sessions.Options{
		Path:     "/",
		HttpOnly: true,
		Secure:   config.GetConfiguration().Web.Secure,
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

// MakePersistentSession saves a persistent cookie in the users browser and stores the neccessary information
// in the database
func MakePersistentSession(w http.ResponseWriter, r *http.Request, user auth.User) {
	userSession := auth.NewUserSessionForUser(user)
	userSession.UserAgent = r.Header.Get("User-Agent")
	userSession.ValidUntil = time.Now().Add(sessionAge)

	browserCookie := http.Cookie{
		Secure:   config.GetConfiguration().Web.Secure,
		Name:     persistentSessionCookieName,
		Value:    userSession.Secret,
		HttpOnly: true,
		Path:     "/",
		MaxAge:   cookieMaxAge,
	}

	schema.GetDatabase().Save(&userSession)
	http.SetCookie(w, &browserCookie)
}

// DeletePersistentSession deletes the cookie in the users browser and the database row
func DeletePersistentSession(w http.ResponseWriter, r *http.Request) {
	cookie, cookieErr := r.Cookie(persistentSessionCookieName)
	if cookieErr != nil {
		logging.GetLogger().Error("error retrieving the persistent cookie", zap.Error(cookieErr))
		return
	}

	user, _ := GetUserForSession(w, r)
	if user == nil {
		// user is not logged in, return in this case
		return
	}

	if err := schema.GetDatabase().Where("user_id=? AND secret=?", user.ID, cookie.Value).
		Delete(auth.UserSession{}).Error; err != nil {
		logging.GetLogger().Error("error during session delete", zap.Error(err))
	}

	cookie.MaxAge = -3600
	cookie.Value = ""
	http.SetCookie(w, cookie)
}
