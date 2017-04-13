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

package intnl

import (
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func MySongsHandler(w http.ResponseWriter, r *http.Request) {
	var mySongs []media.Song

	schema.GetDatabase().Find(&mySongs)
	httpHelpers.ServeJsonWithoutCache(w, mySongs)
}

func SongsInPlaylistsHandler(w http.ResponseWriter, r *http.Request) {
	var song media.Song
	var playlists []media.Playlist
	api.GetObjectById(r, &song)

	schema.GetDatabase().Model(&song).Related(&playlists, "Playlists")

	result := map[string]bool{}

	for _, playlist := range playlists {
		result[playlist.GetApiLink()] = true
	}

	httpHelpers.ServeJsonWithoutCache(w, result)
}
