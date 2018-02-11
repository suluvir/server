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

package intnl

import (
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

type newestContentResponse map[string]interface{}

const responseLimit = 10

func getNewestContentHandler(w http.ResponseWriter, r *http.Request) {
	db := auth.GetUserDatabase(w, r)

	response := newestContentResponse{}
	var newestArtists []media.Artist
	var newestAlbums []media.Album

	db.Find(&newestArtists).Limit(responseLimit)
	db.Find(&newestAlbums).Limit(responseLimit)

	response["artists"] = newestArtists
	response["albums"] = newestAlbums

	httpHelpers.ServeJsonWithoutCache(w, response)
}
