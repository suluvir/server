// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package schema

import (
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/random"
	"time"
)

const ID_LENGTH = 8

// DatabaseObject is the base object for all database objects. Copy from `gorm.Model` for json annotations
type DatabaseObject struct {
	ID        string     `gorm:"primary_key;size:64" json:"id"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `sql:"index" json:"-"`
}

func (d *DatabaseObject) BeforeCreate(scope *gorm.Scope) error {
	if d.ID != "" {
		return nil
	}
	id, err := random.GenerateRandomString(ID_LENGTH)
	scope.SetColumn("ID", id)
	return err
}
