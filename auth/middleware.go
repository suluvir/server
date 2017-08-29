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
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"go.uber.org/zap"
	"net/http"
)

func init() {
	environment.RegisterCallback(addAuthenticationMiddleware, environment.LOGGER_INITIALIZED)
}

func addAuthenticationMiddleware() {
	web.AddPrioritizedMiddleware(authenticationMiddleware, web.AUTHENTICATION_MIDDLEWARE_PRIORITY)
}

func authenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := GetUserForSession(w, r)
		if err != nil {
			logging.GetLogger().Error("error retrieving user from session", zap.Error(err))
		}

		if user == nil || user.Username == "" {
			logging.GetLogger().Debug("user is not logged in while fetching page",
				zap.String("url", r.URL.String()))

			checker := NewUrlWhitelistCheck(r.URL.EscapedPath())
			if !checker.Check() {
				http.Redirect(w, r, getRedirectUrl(), http.StatusFound)
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
	if registeredUsers == 0 && !config.GetConfiguration().Auth.RegistrationDisabled {
		routeName = routeNames.REGISTER
	}
	url, _ := web.GetRouter().GetRoute(routeName).URLPath()

	result := url.String()
	if registeredUsers == 0 {
		result += "?admin=1"
	}

	return result
}
