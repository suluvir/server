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
	s.HandleFunc("/song/{id:[0-9]+}", songApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_SONG)

	s.HandleFunc("/artist/{id:[0-9]+}", artistApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_ARTIST)

	s.HandleFunc("/album/{id:[0-9]+}", albumApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_ALBUM)
	s.HandleFunc("/album/{id:[0-9]+}/songs", albumGetAllSongs).Methods(httpHelpers.GET)

	s.HandleFunc("/song/{id:[0-9]+}/stream", songApiStreamHandler).Methods(httpHelpers.GET).Name(routeNames.API_SONG_STREAM)

	s.HandleFunc("/playlist", playlistCreateHandler).Methods(httpHelpers.POST)
	s.HandleFunc("/playlist/{id:[0-9]+}/song", playlistAddSong).Methods(httpHelpers.POST)
	s.HandleFunc("/playlist/{id:[0-9]+}", playlistGet).Methods(httpHelpers.GET).Name(routeNames.API_PLAYLIST)
	s.HandleFunc("/playlist/{id:[0-9]+}/songs", playlistGetAllSongs).Methods(httpHelpers.GET)
}
