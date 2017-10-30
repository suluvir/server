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
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
)

const (
	statementPosition = 3
	valuesPosition    = 4
	timePosition      = 2
)

const minLength = 5

type DatabaseLogger struct {
	gorm.Logger
}

func (logger *DatabaseLogger) Print(v ...interface{}) {
	l := logging.GetLogger()
	if len(v) < minLength {
		return
	}
	statement := fmt.Sprintf("%s", v[statementPosition])
	values := fmt.Sprintf("%s", v[valuesPosition])
	time := fmt.Sprintf("%s", v[timePosition])

	l.Debug("sql", zap.String("statement", statement), zap.String("values", values),
		zap.String("time", time))
}
