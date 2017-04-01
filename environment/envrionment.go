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

package environment

import (
	"github.com/suluvir/server/util"
	"os"
	"path"
	"path/filepath"
)

const (
	dEFAULT_CONFIG = "suluvir.default.toml"
	uSER_CONFIG    = "suluvir.toml"
)

// eNV_VAR_BASE_PATH is the name of the environment variable that should contain a path to the suluvir
// base directory (lowercased, so that it is not exported)
const eNV_VAR_BASE_PATH string = "SULUVIR_BASE_PATH"

// GetBaseDirectory returns the base directory by checking the following folders for existence
// (the first folder existing will be returned):
//   1. as defined in `SULUVIR_BASE_PATH` (if the path exists)
//   2. the directory of the binary
//
// this directory is used for further directory determination. This function is guaranteed to return a valid directory
func GetBaseDirectory() string {
	envDir, envVarExists := os.LookupEnv(eNV_VAR_BASE_PATH)
	if envVarExists && util.ExistsDir(envDir) {
		return envDir
	}

	binDir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	return binDir
}

// GetConfigurationFile returns the absolute file path of the configuration. If the configuration file could not be
// found, it will panic
func GetConfigurationFile() string {
	configFile := path.Join(GetBaseDirectory(), uSER_CONFIG)
	defaultConfigFile := path.Join(GetBaseDirectory(), dEFAULT_CONFIG)

	if util.ExistsFile(configFile) {
		return configFile
	}
	if util.ExistsFile(defaultConfigFile) {
		return defaultConfigFile
	}
	panic("cannot find configuration file")
}

// GetLogDir returns the directory for the log files
func GetLogDir() string {
	return GetBaseDirectory()
}
