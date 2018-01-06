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

type Artist struct {
	MediaObject
	Name   string  `json:"name"`
	Albums []Album `json:"-"`
}

func init() {
	schema.AddSchema(&Artist{})
}

type JsonArtist Artist

func (a *Artist) GetApiLink() string {
	return a.getLink(routeNames.API_ARTIST)
}

func (a *Artist) GetUiLink() string {
	return a.getLink(routeNames.UI_ARTIST)
}

func (a Artist) MarshalJSON() ([]byte, error) {
	var albums []Album
	schema.GetDatabase().Model(&a).Related(&albums)

	var albumLinks = []string{}
	for _, album := range albums {
		albumLinks = append(albumLinks, album.GetApiLink())
	}

	songsLink := fmt.Sprintf("%s/songs", a.GetApiLink())

	return json.Marshal(struct {
		JsonArtist
		ApiLink       string   `json:"@id"`
		ApiAlbumLinks []string `json:"@albums"`
		SongsLink     string   `json:"@songs"`
		ApiCoverLink  string   `json:"@cover"`
		UiLink        string   `json:"@ui"`
	}{
		JsonArtist:    JsonArtist(a),
		ApiLink:       a.GetApiLink(),
		ApiAlbumLinks: albumLinks,
		SongsLink:     songsLink,
		ApiCoverLink:  a.GetCoverLink(),
		UiLink:        a.GetUiLink(),
	})
}
