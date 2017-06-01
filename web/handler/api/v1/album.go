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

package v1

import (
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func albumApiHandler(w http.ResponseWriter, r *http.Request) {
	var album media.Album
	ResponseSingleObject(w, r, &album)
}

func albumGetAllSongs(w http.ResponseWriter, r *http.Request) {
	var album media.Album
	api.GetObjectById(r, &album)

	songs := album.GetSongs()

	httpHelpers.ServeJsonWithoutCache(w, songs)
}
