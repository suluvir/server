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
)

type Artist struct {
	special.UserBelongingObject
	Name   string  `json:"name"`
	Albums []Album `json:"-"`
}

func init() {
	schema.AddSchema(&Artist{})
}

type JsonArtist Artist

func (a *Artist) GetApiLink() string {
	url, err := web.GetRouter().GetRoute(routeNames.API_ARTIST).URL("id", a.ID)

	if err != nil {
		logging.GetLogger().Error("error generating api url for artist", zap.String("id", a.ID), zap.Error(err))
		return ""
	}

	return url.String()
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
	}{
		JsonArtist:    JsonArtist(a),
		ApiLink:       a.GetApiLink(),
		ApiAlbumLinks: albumLinks,
		SongsLink:     songsLink,
	})
}
