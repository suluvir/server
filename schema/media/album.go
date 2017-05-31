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
	"github.com/suluvir/server/schema/special"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"go.uber.org/zap"
	"strconv"
)

type Album struct {
	special.UserBelongingObject
	Name     string `json:"name"`
	ArtistID uint64 `json:"-"`
	Artist   Artist `json:"-"`
}

func init() {
	schema.AddSchema(&Album{})
}

type JsonAlbum Album

func (a *Album) GetApiLink() string {
	url, err := web.GetRouter().GetRoute(routeNames.API_ALBUM).URL("id", strconv.FormatUint(a.ID, 10))

	if err != nil {
		logging.GetLogger().Error("error generating api url for album", zap.Uint64("id", a.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

func (a Album) MarshalJSON() ([]byte, error) {
	var artist Artist
	var songs []Song
	schema.GetDatabase().Model(&a).Related(&artist)
	schema.GetDatabase().Model(&a).Related(&songs)

	var songLinks = []string{}
	for _, song := range songs {
		songLinks = append(songLinks, song.GetApiLink())
	}

	return json.Marshal(struct {
		JsonAlbum
		ApiLink       string   `json:"@id"`
		ApiArtistLink string   `json:"@artist"`
		ApiSongLinks  []string `json:"@songs"`
	}{
		JsonAlbum:     JsonAlbum(a),
		ApiLink:       a.GetApiLink(),
		ApiArtistLink: artist.GetApiLink(),
		ApiSongLinks:  songLinks,
	})
}
