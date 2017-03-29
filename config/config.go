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
	"github.com/uber-go/zap"
)

var configuration Config

func init() {
	LoadConfiguration()
}

func LoadConfiguration() {
	// TODO ensure that it is not called multiple times?
	configurationFile := environment.GetConfigurationFile()
	if _, err := toml.DecodeFile(configurationFile, &configuration); err != nil {
		logging.GetLogger().Error("Error loading configuration", zap.Error(err))
	}
	logging.GetLogger().Info("read configuration file", zap.String("file", configurationFile))
}

func GetConfiguration() Config {
	return configuration
}
