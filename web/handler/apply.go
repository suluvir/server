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
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func init() {
	router := web.GetRouter()
	router.HandleFunc("/", IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/songs", IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/artists", IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/albums", IndexHandler).Methods(httpHelpers.GET)

	router.HandleFunc("/upload", UploadPageHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", SongUploadHandler).Methods(httpHelpers.POST)

	router.Handler("/static", http.StripPrefix("/static", http.FileServer(http.Dir("layout/static/"))))
	router.Handler("/nodestatic", http.StripPrefix("/nodestatic", http.FileServer(http.Dir("layout/js/node_modules"))))
}
