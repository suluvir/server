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

package media

import (
	"encoding/json"
	"fmt"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/special"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"go.uber.org/zap"
	"strconv"
)

type Playlist struct {
	special.UserBelongingObject
	Name  string `json:"name"`
	Songs []Song `gorm:"many2many:playlist_songs;" json:"-"`
}

type JsonPlaylist Playlist

func init() {
	schema.AddSchema(&Playlist{})
}

// AddSong adds the given song to the playlist. Returns true, if song could be added, false if the song was already
// inside of the playlist
func (p *Playlist) AddSong(song Song) bool {
	if !p.ContainsSong(song) {
		p.Songs = append(p.Songs, song)
		schema.GetDatabase().Save(&p)
		logging.GetLogger().Debug("add song to playlist",
			zap.Uint64("playlist", p.ID), zap.Uint64("song", song.ID))
		return true
	} else {
		logging.GetLogger().Info("not adding song to playlist because it is already in it",
			zap.Uint64("playlist", p.ID), zap.Uint64("song", song.ID))
		return false
	}
}

// ContainsSong checks if the playlist contains the given song
func (p *Playlist) ContainsSong(song Song) bool {
	rows, err := schema.GetDatabase().Table("playlist_songs").Where(
		"playlist_id = ? AND song_id = ?", p.ID, song.ID).Rows()

	if err != nil {
		logging.GetLogger().Error("error during playlist_song fetch", zap.Error(err))
	}

	return rows.Next()
}

func (p *Playlist) GetApiLink() string {
	url, err := web.GetRouter().GetRoute(routeNames.API_PLAYLIST).URL("id", strconv.FormatUint(p.ID, 10))

	if err != nil {
		logging.GetLogger().Error("error generating api url for playlist", zap.Uint64("id", p.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

func (p Playlist) MarshalJSON() ([]byte, error) {
	apiLink := p.GetApiLink()
	songsLink := fmt.Sprintf("%s/songs", apiLink)
	return json.Marshal(struct {
		JsonPlaylist
		ApiLink   string `json:"@id"`
		SongsLink string `json:"@songs"`
	}{
		JsonPlaylist: JsonPlaylist(p),
		ApiLink:      apiLink,
		SongsLink:    songsLink,
	})
}
