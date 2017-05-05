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

package web

import (
	"fmt"
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web/routeNames"
	"github.com/uber-go/zap"
	"net/http"
	"time"
)

func logMiddleWare(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		logging.GetLogger().Debug("incoming request start", zap.String("url", r.URL.String()))
		next.ServeHTTP(w, r)
		elapsed := time.Since(start)
		logging.GetLogger().Debug("incoming request finished",
			zap.String("url", r.URL.String()),
			zap.String("elapsed", fmt.Sprintf("%s", elapsed)))
	})
}

func authenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := auth.GetUserForSession(w, r)
		if err != nil {
			logging.GetLogger().Error("error retrieving user from session", zap.Error(err))
		}

		if user == nil || user.Username == "" {
			logging.GetLogger().Debug("user is not logged in while fetching page",
				zap.String("url", r.URL.String()))

			checker := auth.NewUrlWhitelistCheck(r.URL.EscapedPath())
			if !checker.Check() {
				http.Redirect(w, r, getRedirectUrl(), 302)
				return
			}

		} else {
			logging.GetLogger().Debug("got user for session", zap.String("user", user.Username))
		}
		next.ServeHTTP(w, r)
	})
}

func getRedirectUrl() string {
	var registeredUsers uint64
	schema.GetDatabase().Table("users").Count(&registeredUsers)
	routeName := routeNames.LOGIN
	if registeredUsers == 0 {
		routeName = routeNames.REGISTER
	}
	url, _ := GetRouter().GetRoute(routeName).URL()

	result := url.String()
	if registeredUsers == 0 {
		result += "?admin=1"
	}

	return result
}
