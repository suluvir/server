package schema

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/logging"
)

type DatabaseLogger struct {
	gorm.Logger
}

func (logger *DatabaseLogger) Print(v ...interface{}) {
	l := logging.GetLogger()
	for _, f := range v {
		l.Debug(fmt.Sprintf("%s", f))
	}
}
