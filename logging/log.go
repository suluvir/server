package logging

import (
	"github.com/uber-go/zap"
	"os"
)

// don't use configuration here because of import cycle
const LOG_FILE_NAME = "log.log"

var logger *zap.Logger

func init() {
	InitializeLogger()
}

func GetLogger() zap.Logger {
	return *logger
}

func InitializeLogger() {
	file, err := os.OpenFile(LOG_FILE_NAME, os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		// TODO ignore this?
	}

	tmpLogger := zap.New(
		zap.NewTextEncoder(zap.TextNoTime()),
		zap.Output(file),
		zap.DebugLevel,
	)
	logger = &tmpLogger
}
