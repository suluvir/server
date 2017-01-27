package media

import (
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"encoding/json"
	"github.com/suluvir/server/web/routeNames"
	"strconv"
	"github.com/suluvir/server/web"
	"fmt"
)

type Song struct {
	schema.DatabaseObject
	Artists []Artist `gorm:"many2many:song_artists;" json:"-"`
	Title string `json:"title"`
	Size int64 `json:"size"`
	Duration float64 `json:"duration"`
	Filename string `gorm:"size:40" json:"-"`
	AlbumID uint `json:"-"`
	Album Album `json:"-"`
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
		db.Save(&s.Album)
	}

	logging.GetLogger().Info("created new song", zap.Uint64("id", s.ID))
}

func (s *Song) GetApiLink() string {
	router := web.GetRouter()
	url, err := router.Get(routeNames.API_SONG).URL("id", strconv.FormatUint(s.ID, 10))

	if err != nil {
		logging.GetLogger().Error("error generating api url for song", zap.Uint64("id", s.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

func (s Song) MarshalJSON() ([]byte, error) {
	streamLink := fmt.Sprintf("%s/%s", s.GetApiLink(), "stream")
	var album Album
	var artists []Artist;
	schema.GetDatabase().Model(&s).Related(&album)
	schema.GetDatabase().Model(&s).Related(&artists, "Artists")

	var artistLinks = []string{}
	for _, artist := range artists {
		artistLinks = append(artistLinks, artist.GetApiLink())
	}

	return json.Marshal(struct {
		JsonSong
		ApiLink string `json:"@id"`
		ApiAlbumLink string `json:"@album"`
		StreamLink string `json:"@stream"`
		ApiArtistLinks []string `json:"@artists"`
	}{
		JsonSong: JsonSong(s),
		ApiLink: s.GetApiLink(),
		ApiAlbumLink: album.GetApiLink(),
		StreamLink: streamLink,
		ApiArtistLinks: artistLinks,
	})
}
