package media

import "github.com/jinzhu/gorm"

type Artist struct {
	gorm.Model
	Name string
}
