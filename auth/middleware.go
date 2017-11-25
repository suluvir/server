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
	"fmt"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"go.uber.org/zap"
	"net/http"
	"net/url"
)

func init() {
	environment.RegisterCallback(addAuthenticationMiddleware, environment.LOGGER_INITIALIZED)
}

func addAuthenticationMiddleware() {
	web.AddPrioritizedMiddleware(authenticationMiddleware, web.AUTHENTICATION_MIDDLEWARE_PRIORITY)
	web.AddPrioritizedMiddleware(staySignedInMiddleware, web.STAY_SIGNED_IN_PRIORITY)
}

func authenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		user, err := GetUserForSession(w, r)
		if err != nil {
			logging.GetLogger().Error("error retrieving user from session", zap.Error(err))
		}

		if !UserIsLoggedIn(w, r) {
			logging.GetLogger().Debug("user is not logged in while fetching page",
				zap.String("url", r.URL.String()))

			checker := NewUrlWhitelistCheck(r.URL.EscapedPath())
			if !checker.Check() {
				http.Redirect(w, r, getRedirectUrl(r), http.StatusFound)
				return
			}

		} else {
			logging.GetLogger().Debug("got user for session", zap.String("user", user.Username))
			blacklistChecker := NewUrlBlacklistCheck(r.URL.EscapedPath())
			if blacklistChecker.Check() {
				logging.GetLogger().Debug("user is logged in and not allowed to view the current site",
					zap.String("routeUrl", r.URL.EscapedPath()), zap.String("user", user.Username))
				route := web.GetRouter().GetRoute(routeNames.INDEX)
				routeUrl, _ := route.URL()
				http.Redirect(w, r, routeUrl.String(), http.StatusFound)
				return
			}
		}
		next.ServeHTTP(w, r)
	})
}

func staySignedInMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if UserIsLoggedIn(w, r) {
			next.ServeHTTP(w, r)
			return
		}
		RecoverPersistentSession(w, r)
		next.ServeHTTP(w, r)
	})
}

func getRedirectUrl(r *http.Request) string {
	var registeredUsers uint64
	schema.GetDatabase().Table("users").Count(&registeredUsers)
	routeName := routeNames.LOGIN
	if registeredUsers == 0 && !config.GetConfiguration().Auth.RegistrationDisabled {
		routeName = routeNames.REGISTER
	}
	redirectUrl, _ := web.GetRouter().GetRoute(routeName).URLPath()

	result := redirectUrl.String()
	returnUrl := r.URL.EscapedPath()
	result += fmt.Sprintf("?return_to=%s", url.QueryEscape(returnUrl))

	return result
}
