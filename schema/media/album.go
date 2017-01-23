package media

import (
	"github.com/jinzhu/gorm"
)

type Album struct {
	gorm.Model
	Name string
	// FIXME add artist + artist id, but skip it for now, because it's too complicated to work out with gorm
}
