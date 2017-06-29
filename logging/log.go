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

package logging

import (
	"github.com/suluvir/server/environment"
	"go.uber.org/zap"
	"log"
	"path"
)

// don't use configuration here because of import cycle
const LOG_FILE_NAME = "log.log"

var logger *zap.Logger

func init() {
	InitializeLogger()
}

func GetLogger() *zap.Logger {
	return logger
}

func InitializeLogger() {
	config := zap.NewDevelopmentConfig()
	config.OutputPaths = []string{
		path.Join(environment.GetLogDir(), LOG_FILE_NAME),
	}

	l, err := config.Build(
		zap.AddCaller(),
	)
	if err != nil {
		log.Fatal("error initilizing logger: ", err)
	}

	logger = l
}
