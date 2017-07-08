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
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
)

func init() {
	r := web.GetRouter().Subrouter("/api/internal")

	r.HandleFunc("/upload", songUploadHandler).Methods(httpHelpers.POST)

	r.HandleFunc("/my/songs", mySongsHandler).Methods(httpHelpers.GET)
	r.HandleFunc("/my/artists", myArtistsHandler).Methods(httpHelpers.GET)
	r.HandleFunc("/my/albums", myAlbumsHandler).Methods(httpHelpers.GET)
	r.HandleFunc("/my/playlists", myPlaylistHandler).Methods(httpHelpers.GET)
	r.HandleFunc("/my/quota", getQuotaHandler).Methods(httpHelpers.GET)

	r.HandleFunc("/my/user", getMyUser).Methods(httpHelpers.GET)

	r.HandleFunc("/song/{id}/playlists", songsInPlaylistsHandler).Methods(httpHelpers.GET)

	r.HandleFunc("/user/register", createUserHandler).Methods(httpHelpers.POST)
	r.HandleFunc("/user/login", loginUserHandler).Methods(httpHelpers.POST)
}
