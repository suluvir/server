package media

import (
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
)

type Song struct {
	schema.DatabaseObject
	Artists []Artist `gorm:"many2many:song_artists;" json:"-"`
	Title string `json:"title"`
	Size int64 `json:"size"`
	Duration float64 `json:"duration"`
	Filename string `gorm:"size:40" json:"filename"`
	AlbumID uint `json:"album_id"`
	Album Album `json:"-"`
}

func (s *Song) Create() {
	db := schema.GetDatabase()
	db.Create(s)

	if len(s.Artists) > 0 {
		a := s.Artists[0]
		s.Album.Artist = a
		s.Album.ArtistID = a.ID
		db.Save(&s.Album)
	}

	logging.GetLogger().Info("created new song", zap.Uint("id", s.ID))
}
