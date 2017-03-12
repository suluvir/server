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
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func MyPlaylistHandler(w http.ResponseWriter, r *http.Request) {
	var myPlaylists []media.Playlist

	schema.GetDatabase().Find(&myPlaylists)
	httpHelpers.ServeJsonWithoutCache(w, &myPlaylists)
}
