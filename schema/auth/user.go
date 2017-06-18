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

package auth

import (
	"encoding/gob"
	"github.com/suluvir/server/schema"
	"time"
)

type User struct {
	schema.DatabaseObject
	ActiveAt   time.Time `json:"-"`
	Username   string    `gorm:"size:128" json:"username"`
	Email      string    `gorm:"size:128" json:"email"`
	Password   string    `gorm:"size:64" json:"-"`
	QuotaSongs int64
	QuotaSpace int64
}

func init() {
	schema.AddSchema(&User{})

	// add user to gob for allowing it to store it for sessions
	gob.Register(&User{})
}
