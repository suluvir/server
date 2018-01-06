// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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

package handler

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"net/http"
)

func activateHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	err := auth.ActivateUser(vars["uuid"])

	url, _ := web.GetRouter().GetRoute(routeNames.LOGIN).URLPath()
	urlString := url.String()
	status := ""

	if err != nil {
		// no user could be activated
		status = "invalid_code"
	} else {
		// user was activated
		status = "user_activated"
	}

	urlString = fmt.Sprintf("%s?status=%s", urlString, status)
	http.Redirect(w, r, urlString, http.StatusFound)
}
