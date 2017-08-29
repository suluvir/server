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
	"errors"
	"fmt"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"go.uber.org/zap"
)

type Song struct {
	MediaObject
	Artists   []Artist   `gorm:"many2many:song_artists;" json:"-"`
	Title     string     `json:"title"`
	Track     int        `json:"track"`
	Size      int64      `json:"size"`
	Duration  float64    `json:"duration"`
	Filename  string     `gorm:"size:40" json:"-"`
	AlbumID   string     `gorm:"size:64" json:"-"`
	Album     Album      `json:"-"`
	Type      string     `json:"type"`
	Playlists []Playlist `gorm:"many2many:playlist_songs;" json:"-"`
}

func init() {
	schema.AddSchema(&Song{})
}

type JsonSong Song

func (s *Song) Create() {
	db := schema.GetDatabase()
	db.Create(s)

	if len(s.Artists) > 0 {
		a := s.Artists[0]
		s.Album.Artist = a
		s.Album.ArtistID = a.ID
		s.Album.User = s.User
		s.Album.UserId = s.UserId
		db.Save(&s.Album)
	}

	logging.GetLogger().Info("created new song", zap.String("id", s.ID))
}

func (s *Song) GetApiLink() string {
	url, err := web.GetRouter().GetRoute(routeNames.API_SONG).URLPath("id", s.ID)

	if err != nil {
		logging.GetLogger().Error("error generating api url for song", zap.String("id", s.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

func (s Song) MarshalJSON() ([]byte, error) {
	streamLink := fmt.Sprintf("%s/%s", s.GetApiLink(), "stream")
	var album Album
	var artists []Artist
	schema.GetDatabase().Model(&s).Related(&album)
	schema.GetDatabase().Model(&s).Related(&artists, "Artists")

	var artistLinks = []string{}
	var artistNames = []string{}
	for _, artist := range artists {
		artistLinks = append(artistLinks, artist.GetApiLink())
		artistNames = append(artistNames, artist.Name)
	}

	return json.Marshal(struct {
		JsonSong
		ApiLink        string   `json:"@id"`
		ApiAlbumLink   string   `json:"@album"`
		StreamLink     string   `json:"@stream"`
		ApiArtistLinks []string `json:"@artists"`
		ArtistNames    []string `json:"artist_names"`
		ApiCoverLink   string   `json:"@cover"`
		UiLink         string   `json:"@ui"`
	}{
		JsonSong:       JsonSong(s),
		ApiLink:        s.GetApiLink(),
		ApiAlbumLink:   album.GetApiLink(),
		StreamLink:     streamLink,
		ApiArtistLinks: artistLinks,
		ArtistNames:    artistNames,
		ApiCoverLink:   s.GetCoverLink(),
		UiLink:         s.GetUiLink(),
	})
}

func (s *Song) GetUploadFilePath() (string, error) {
	if s.Filename == "" {
		return "", errors.New("song has no filename")
	}
	c := config.GetConfiguration()
	if c.Upload.Relative {
		return fmt.Sprintf("./%s/%s", c.Upload.Path, s.Filename), nil
	}
	return fmt.Sprintf("%s/%s", c.Upload.Path, s.Filename), nil
}
