// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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
	"github.com/suluvir/server/environment"
	"testing"
)

func TestReadDefaultConfig(t *testing.T) {
	configFile := environment.GetDefaultConfigFile()
	config := readConfiguration(configFile)

	if config.Version != "0.0.1" {
		t.Error("expected version to be 0.0.1, got", config.Version)
	}
	if config.Database.Dialect != "mysql" {
		t.Error("expected dialect to be mysql, got", config.Database.Dialect)
	}
	if config.Upload.Path != "uploads" {
		t.Error("expected upload path to be uploads, got", config.Upload.Path)
	}
	if !config.Upload.Relative {
		t.Error("upload relative setting not set correctly")
	}
	if config.Web.Hostname != "localhost" {
		t.Error("expected hostname to be localhost, got", config.Web.Hostname)
	}
	if config.Web.Port != 8080 {
		t.Error("expected port to be 8080, got", config.Web.Port)
	}
	if config.Development.DevelopmentMode != true {
		t.Error("development mode set to false")
	}
	if config.Auth.RegistrationDisabled != false {
		t.Error("expected registration to be enabled")
	}
}
