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
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/httpHelpers"
	"go.uber.org/zap"
	"net/http"
)

type playlistAddSongPayload struct {
	SongId int `json:"song_id"`
}

func playlistGet(w http.ResponseWriter, r *http.Request) {
	var playlist media.Playlist
	ResponseSingleObject(w, r, &playlist)
}

func playlistCreateHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	user := auth.MustGetUserForSession(w, r)
	var playlist media.Playlist

	err := decoder.Decode(&playlist)
	if err != nil {
		logging.GetLogger().Error("error during playlist decoding", zap.Error(err))
		return
	}

	playlist.User = *user

	logging.GetLogger().Debug("decoded playlist", zap.String("name", playlist.Name))
	schema.GetDatabase().Create(&playlist)
	logging.GetLogger().Info("created new playlist", zap.String("name", playlist.Name))

	ResponseSingleObject(w, r, &playlist)
}

func playlistAddSong(w http.ResponseWriter, r *http.Request) {
	var playlist media.Playlist
	var payload playlistAddSongPayload
	var songToAdd media.Song

	vars := mux.Vars(r)
	schema.GetDatabase().First(&playlist, "id = ?", vars["id"])

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&payload)
	if err != nil {
		logging.GetLogger().Error("error while decoding song add payload", zap.Error(err))
	}

	schema.GetDatabase().First(&songToAdd, "id = ?", payload.SongId)

	playlist.AddSong(songToAdd)

	httpHelpers.ServeJsonWithoutCache(w, &songToAdd)
}

func playlistGetAllSongs(w http.ResponseWriter, r *http.Request) {
	var playlist media.Playlist
	var songs []media.Song
	api.GetObjectById(r, &playlist)

	schema.GetDatabase().Model(&playlist).Related(&songs, "Songs")

	httpHelpers.ServeJsonWithoutCache(w, songs)
}
