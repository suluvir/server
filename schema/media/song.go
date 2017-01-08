package media

import "github.com/jinzhu/gorm"

type Song struct {
	gorm.Model
	Artists []Artist `gorm:"many2many:song_artists;"`
	Title string
	Size int64
	Duration float64
}
