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

package media

import (
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema/special"
	"github.com/suluvir/server/web"
	"go.uber.org/zap"
)

type MediaObject struct {
	special.UserBelongingObject
	Covername string `gorm:"size:128" json:"-"`
}

// GetUiLink returns the link for the specific media objects ui
func (m *MediaObject) GetUiLink() string {
	return "/"
}

func (m *MediaObject) getLink(routeName string) string {
	url, err := web.GetRouter().GetRoute(routeName).URL("id", m.ID)

	if err != nil {
		logging.GetLogger().Error("error generating url for media object", zap.String("id", m.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

// GetCoverLink returns the link for the cover art
func (m *MediaObject) GetCoverLink() string {
	return "/static/img/cover/default.png"
}
