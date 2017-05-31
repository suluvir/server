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
	"go.uber.org/zap"
	"log"
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
	//logFile := path.Join(environment.GetLogDir(), LOG_FILE_NAME)
	//file, err := os.OpenFile(logFile, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	//if err != nil {
	//	log.Fatal("error opening log file: ", err)
	//}

	//tmpLogger := zap.New(
	//	zap.NewTextEncoder(zap.TextNoTime()),
	//	zap.Output(file),
	//	zap.DebugLevel,
	//)

	tmpLogger, err := zap.NewProduction()
	if err != nil {
		log.Fatal("error initilizing logger: ", err)
	}

	logger = tmpLogger
}
