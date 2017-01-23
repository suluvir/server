package media

import (
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/schema"
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

func (s *Song) Save() {
	db := schema.GetDatabase()
	db.Create(s)
}
