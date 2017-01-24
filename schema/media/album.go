package media

import (
	"github.com/jinzhu/gorm"
)

type Album struct {
	gorm.Model
	Name string
	ArtistID uint
	Artist Artist
}
