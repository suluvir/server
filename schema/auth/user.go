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
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"go.uber.org/zap"
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

// GetAvailableQuota returns the available quota for a given user. First, it returns available space (in bytes)
// second, it returns the number of songs the user is allowed to upload until his quota is reached
func (u *User) GetAvailableQuota() (int64, int64) {
	db := schema.GetDatabase()
	rows, err := db.Table("songs").Select("sum(size) as size, count(*) as count").
		Group("user_id").Where("user_id = ?", u.ID).Rows()
	if err != nil {
		logging.GetLogger().Error("error during quota calculation", zap.Error(err))
		return 0, 0
	}

	for rows.Next() {
		var size int64
		var count int64
		err := rows.Scan(&size, &count)
		if err != nil {
			logging.GetLogger().Error("error during row scan", zap.Error(err))
			// return 0 for both so the user isn't allowed to upload anything in an error case
			return 0, 0
		}
		return u.QuotaSpace - size, u.QuotaSongs - count
	}

	// if there are no rows, the user has uploaded no songs, so just returns his quota
	return u.QuotaSpace, u.QuotaSongs
}
