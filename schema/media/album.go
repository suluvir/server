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

package media

import (
	"encoding/json"
	"fmt"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web/routeNames"
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
	return a.getLink(routeNames.API_ALBUM)
}

func (a *Album) GetUiLink() string {
	return a.getLink(routeNames.UI_ALBUM)
}

func (a *Album) GetSongs() []Song {
	var songs []Song
	schema.GetDatabase().Where("album_id = ?", a.ID).Order("track").Find(&songs)

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
		UiArtistLink  string `json:"ui_artist_link"`
	}{
		JsonAlbum:     JsonAlbum(a),
		ApiLink:       a.GetApiLink(),
		ApiArtistLink: artist.GetApiLink(),
		ApiSongsLink:  songsLink,
		ApiCoverLink:  a.GetCoverLink(),
		UiLink:        a.GetUiLink(),
		ArtistName:    artist.Name,
		UiArtistLink:  artist.GetUiLink(),
	})
}
