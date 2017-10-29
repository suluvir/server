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
	"github.com/suluvir/server/random"
	"github.com/suluvir/server/schema"
	"time"
)

// UserSession maps a user to a secret to allow him to stay signed in across multiple
// sessions
type UserSession struct {
	schema.DatabaseObject
	UserID     string `gorm:"size:64"`
	User       User
	Secret     string `gorm:"size:128"`
	UserAgent  string `gorm:"size:1024"`
	IPAddress  string `gorm:"size:64"`
	ValidUntil time.Time
}

func init() {
	schema.AddSchema(UserSession{})
}

// NewUserSessionForUser returns a new user session for the given user
func NewUserSessionForUser(user User) UserSession {
	secret, _ := random.GenerateRandomString(64)
	return UserSession{
		User:   user,
		Secret: secret,
	}
}
