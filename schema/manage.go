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
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
)

var database *gorm.DB

var schemata []interface{}

func init() {
	ConnectDatabase()
}

func AddSchema(schema interface{}) {
	schemata = append(schemata, schema)
}

func ConnectDatabase() error {
	c := config.GetConfiguration()
	db, err := gorm.Open(c.Database.Dialect, c.Database.ConnectionString)
	if err != nil {
		logging.GetLogger().Fatal("error connecting to database", zap.Error(err))
		return err
	}
	database = db

	GetDatabase().LogMode(true)
	GetDatabase().SetLogger(&DatabaseLogger{})

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

func CreateOrUpdate() error {
	logging.GetLogger().Debug("create or update database schema")

	for _, schema := range schemata {
		GetDatabase().AutoMigrate(schema)
	}

	return nil
}
