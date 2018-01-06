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

package v1

import (
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func artistApiHandler(w http.ResponseWriter, r *http.Request) {
	var artist media.Artist
	ResponseSingleObject(w, r, &artist)
}

func artistGetAllSongs(w http.ResponseWriter, r *http.Request) {
	var artist media.Artist
	var albums []media.Album
	var songs []media.Song
	api.GetObjectById(r, &artist)

	schema.GetDatabase().Model(&artist).Related(&albums, "Albums")
	for _, album := range albums {
		albumSongs := album.GetSongs()
		for _, song := range albumSongs {
			songs = append(songs, song)
		}
	}

	httpHelpers.ServeJsonWithoutCache(w, songs)
}
