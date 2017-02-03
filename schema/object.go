package schema

import (
	"time"
)

// the base object for all database objects. Copy from `gorm.Model` for json annotations
type DatabaseObject struct {
	ID        uint64     `gorm:"primary_key" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `sql:"index" json:"-"`
}
