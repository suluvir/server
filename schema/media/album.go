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
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"go.uber.org/zap"
)

type Album struct {
	MediaObject
	Name     string `json:"name"`
	ArtistID string `gorm:"size:64" json:"-"`
	Artist   Artist `json:"-"`
}

func init() {
	schema.AddSchema(&Album{})
}

type JsonAlbum Album

func (a *Album) GetApiLink() string {
	url, err := web.GetRouter().GetRoute(routeNames.API_ALBUM).URL("id", a.ID)

	if err != nil {
		logging.GetLogger().Error("error generating api url for album", zap.String("id", a.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

func (a *Album) GetUiLink() string {
	return a.getUiLink(routeNames.UI_ALBUM)
}

func (a *Album) GetSongs() []Song {
	var songs []Song
	schema.GetDatabase().Where("album_id = ?", a.ID).Find(&songs)

	return songs
}

func (a Album) MarshalJSON() ([]byte, error) {
	var artist Artist
	schema.GetDatabase().Model(&a).Related(&artist)

	songsLink := fmt.Sprintf("%s/songs", a.GetApiLink())

	return json.Marshal(struct {
		JsonAlbum
		ApiLink       string `json:"@id"`
		ApiArtistLink string `json:"@artist"`
		ApiSongsLink  string `json:"@songs"`
		ApiCoverLink  string `json:"@cover"`
		UiLink        string `json:"@ui"`
		ArtistName    string `json:"artist_name"`
	}{
		JsonAlbum:     JsonAlbum(a),
		ApiLink:       a.GetApiLink(),
		ApiArtistLink: artist.GetApiLink(),
		ApiSongsLink:  songsLink,
		ApiCoverLink:  a.GetCoverLink(),
		UiLink:        a.GetUiLink(),
		ArtistName:    artist.Name,
	})
}
