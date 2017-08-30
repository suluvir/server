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
	"errors"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
	"path"

	// imports for supported dbms (import them here instead of the main module since the main
	// module is not compiled during tests)
	_ "github.com/jinzhu/gorm/dialects/mysql"
	//	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

// constants for supported dmbs names in config
const (
	SQLITE = "sqlite3"
	MYSQL  = "mysql"
)

var supportedDbms = []string{
	MYSQL,
}

var database *gorm.DB

var schemata []interface{}

func init() {
	environment.RegisterCallback(ConnectDatabase, environment.CONNECT_DATABASE)
}

func AddSchema(schema interface{}) {
	schemata = append(schemata, schema)
}

func ConnectDatabase() {
	dialect, connectionString := getDialectAndConnectionString()
	dialectErr := checkForSupportedDbms(dialect)
	if dialectErr != nil {
		logging.GetLogger().Fatal("dbms not supported", zap.Error(dialectErr))
		panic(dialectErr)
	}
	db, err := gorm.Open(dialect, connectionString)
	if err != nil {
		logging.GetLogger().Fatal("error connecting to database", zap.Error(err))
	}
	database = db

	GetDatabase().LogMode(true).SetLogger(&DatabaseLogger{})
}

func checkForSupportedDbms(dialect string) error {
	for _, dbms := range supportedDbms {
		if dbms == dialect {
			return nil
		}
	}
	return errors.New(fmt.Sprintf("dbms '%s' not supported", dialect))
}

func getDialectAndConnectionString() (string, string) {
	c := config.GetConfiguration()
	dialect := c.Database.Dialect
	connectionString := c.Database.ConnectionString

	if dialect == SQLITE {
		connectionString = path.Join(environment.GetBaseDirectory(), connectionString)
	}

	return dialect, connectionString
}

func CloseDatabaseConnection() {
	if database == nil {
		// database was never initialized
		return
	}
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
