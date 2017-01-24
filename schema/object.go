package schema

import "github.com/jinzhu/gorm"

// the base object for all database objects
type DatabaseObject struct {
	gorm.Model
}
