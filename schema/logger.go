package schema

import (
	"github.com/suluvir/server/logging"
	"fmt"
	"github.com/jinzhu/gorm"
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
