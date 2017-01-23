package schema

import (
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/config"
	"github.com/jinzhu/gorm"
	"github.com/uber-go/zap"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

var database *gorm.DB

func ConnectDatabase() error {
	c := config.GetConfiguration()
	db, err := gorm.Open(c.Database.Dialect, c.Database.ConnectionString)
	if err != nil {
		logging.GetLogger().Fatal("error connecting to database", zap.Error(err))
		return err
	}
	database = db
	return nil
}

func CloseDatabaseConnection() {
	logging.GetLogger().Info("close database connection")
	err := database.Close()
	if err != nil {
		logging.GetLogger().Error("error closing database connection", zap.Error(err))
		return
	}
	logging.GetLogger().Info("database connection closed")
}

func GetDatabase() *gorm.DB {
	return database
}
