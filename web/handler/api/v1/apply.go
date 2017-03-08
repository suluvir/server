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
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/suluvir/server/web/routeNames"
)

func init() {
	s := web.GetRouter().Subrouter("/api/v1")
	s.HandleFunc("/song/{id:[0-9]+}", SongApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_SONG)
	s.HandleFunc("/artist/{id:[0-9]+}", ArtistApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_ARTIST)
	s.HandleFunc("/album/{id:[0-9]+}", AlbumApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_ALBUM)

	s.HandleFunc("/song/{id:[0-9]+}/stream", SongApiStreamHandler).Methods(httpHelpers.GET).Name(routeNames.API_SONG_STREAM)
}
