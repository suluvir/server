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

package config

import (
	"github.com/BurntSushi/toml"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/web/setup"
	"go.uber.org/zap"
	"net/http"
)

var configuration *Config

func init() {
	LoadConfiguration()

	setup.AddCallBack(addDevelopmentModeToSetup)
}

func addDevelopmentModeToSetup(_ *http.Request) (string, interface{}) {
	return "development", GetConfiguration().Development.DevelopmentMode
}

func LoadConfiguration() {
	// TODO ensure that it is not called multiple times?
	configurationFile := environment.GetConfigurationFile()
	c := ReadConfiguration(configurationFile)
	configuration = &c
}

func ReadConfiguration(filename string) Config {
	var config Config
	if _, err := toml.DecodeFile(filename, &config); err != nil {
		logging.GetLogger().Error("Error loading configuration", zap.Error(err))
	}
	logging.GetLogger().Info("read configuration file", zap.String("file", filename))

	return config
}

func GetConfiguration() Config {
	if configuration == nil {
		LoadConfiguration()
	}
	return *configuration
}
