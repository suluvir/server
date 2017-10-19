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

var givenBaseDirectory = ""

// eNV_VAR_BASE_PATH is the name of the environment variable that should contain a path to the suluvir
// base directory (lowercased, so that it is not exported)
const eNV_VAR_BASE_PATH string = "SULUVIR_BASE_PATH"

// eNV_VAR_CI_BASE_PATH is the name of the envrironment variable used by ci to store the base directory
const eNV_VAR_CI_BASE_PATH = "TRAVIS_BUILD_DIR"

// eNV_VAR_LOG_DIR is the name of the environment variable containing the absolute path to the log dir.
// Falls back to base directory, if not set
const eNV_VAR_LOG_DIR = "SULUVIR_LOG_DIR"

// GetBaseDirectory returns the base directory by checking the following folders for existence
// (the first folder existing will be returned):
//   1. as given in the --base/-b cli flag
//   2. as defined in `SULUVIR_BASE_PATH` (if the path exists)
//   3. as defined in `TRAVIS_BUILD_DIR` (if on ci)
//   4. the directory of the binary
//
// this directory is used for further directory determination. This function is guaranteed to return a valid directory
func GetBaseDirectory() string {
	if givenBaseDirectory != "" {
		return givenBaseDirectory
	}

	envDir, envVarExists := os.LookupEnv(eNV_VAR_BASE_PATH)
	if envVarExists && util.ExistsDir(envDir) {
		return envDir
	}

	ciEnvDir, ciEnvVarExists := os.LookupEnv(eNV_VAR_CI_BASE_PATH)
	if ciEnvVarExists && util.ExistsDir(ciEnvDir) {
		return ciEnvDir
	}

	binDir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	return binDir
}

// SetBaseDirectory sets the base directory. This function is only intended to be called by the main file. It will
// set the given directory if it exists
func SetBaseDirectory(dir string) {
	if dir != "" && util.ExistsDir(dir) {
		givenBaseDirectory = dir
	}
}

// GetConfigurationFile returns the absolute file path of the configuration. If the configuration file could not be
// found, it will panic
func GetConfigurationFile() string {
	configFile := path.Join(GetBaseDirectory(), uSER_CONFIG)

	if util.ExistsFile(configFile) {
		return configFile
	}

	return GetDefaultConfigFile()
}

func GetDefaultConfigFile() string {
	file := path.Join(GetBaseDirectory(), dEFAULT_CONFIG)

	if util.ExistsFile(file) {
		return file
	}

	panic("configuration file not found")
}

// GetLogDir returns the directory for the log files
func GetLogDir() string {
	envDir, envVarExists := os.LookupEnv(eNV_VAR_LOG_DIR)
	if envVarExists && util.ExistsDir(envDir) {
		return envDir
	}
	return GetBaseDirectory()
}
