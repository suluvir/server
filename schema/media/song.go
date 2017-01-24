package media

import (
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
)

type Song struct {
	gorm.Model
	Artists []Artist `gorm:"many2many:song_artists;"`
	Title string
	Size int64
	Duration float64
	AlbumID uint
	Album Album
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
