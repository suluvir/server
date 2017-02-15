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
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"github.com/uber-go/zap"
	"strconv"
)

type Artist struct {
	schema.DatabaseObject
	Name   string  `json:"name"`
	Albums []Album `json:"-"`
}

func init() {
	schema.AddSchema(&Artist{})
}

type JsonArtist Artist

func (a *Artist) GetApiLink() string {
	router := web.GetRouter()
	url, err := router.Get(routeNames.API_ARTIST).URL("id", strconv.FormatUint(a.ID, 10))

	if err != nil {
		logging.GetLogger().Error("error generating api url for artist", zap.Uint64("id", a.ID), zap.Error(err))
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

	return json.Marshal(struct {
		JsonArtist
		ApiLink       string   `json:"@id"`
		ApiAlbumLinks []string `json:"@albums"`
	}{
		JsonArtist:    JsonArtist(a),
		ApiLink:       a.GetApiLink(),
		ApiAlbumLinks: albumLinks,
	})
}
