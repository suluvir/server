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

type Config struct {
	Version  string
	Upload   upload
	Web      web
	Database database
}

type auth struct {
	RegistrationDisabled bool `toml:"registration_disabled"`
}

type development struct {
	DevelopmentMode bool `toml:"development_mode"`
}

type upload struct {
	Path     string
	Relative bool
}

type web struct {
	Port     int
	Hostname string
}

type database struct {
	Dialect          string
	ConnectionString string `toml:"connection_string"`
}
