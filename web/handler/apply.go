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

package handler

import (
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/suluvir/server/web/routeNames"
	"net/http"
	"path"
)

func init() {
	router := web.GetRouter()
	router.HandleFunc("/", indexHandler).Methods(httpHelpers.GET).Name(routeNames.INDEX)
	router.HandleFunc("/songs", indexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/artists", indexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/albums", indexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/playlists", indexHandler).Methods(httpHelpers.GET)

	router.HandleFunc("/album/{id}", indexHandler).Methods(httpHelpers.GET).Name(routeNames.UI_ALBUM)
	router.HandleFunc("/artist/{id}", indexHandler).Methods(httpHelpers.GET).Name(routeNames.UI_ARTIST)

	router.HandleFunc("/profile", indexHandler).Methods(httpHelpers.GET)

	router.HandleFunc("/login", indexHandler).Methods(httpHelpers.GET).Name(routeNames.LOGIN)
	router.HandleFunc("/logout", logoutHandler)
	router.HandleFunc("/register", indexHandler).Methods(httpHelpers.GET).Name(routeNames.REGISTER)
	router.HandleFunc("/activate/{uuid}", activateHandler).Methods(httpHelpers.GET).Name(routeNames.ACTIVATE_USER)

	router.HandleFunc("/upload", indexHandler).Methods(httpHelpers.GET)

	staticDir := path.Join(environment.GetBaseDirectory(), "layout", "static")
	nodeStaticDir := path.Join(environment.GetBaseDirectory(), "layout", "js", "node_modules")
	router.Handler("/static", http.StripPrefix("/static", http.FileServer(http.Dir(staticDir))))
	router.Handler("/nodestatic", http.StripPrefix("/nodestatic", http.FileServer(http.Dir(nodeStaticDir))))
}
