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

// Config is the base type describing the structure of the config file
type Config struct {
	Version     string
	Upload      upload
	Web         web
	Database    database
	Auth        auth
	Oauth       oauth
	Development development
	Quota       quota
	Mail        mail
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
	Port        int
	OutsidePort int `toml:"outside_port"`
	Hostname    string
	Secure      bool
}

type database struct {
	Dialect          string
	ConnectionString string `toml:"connection_string"`
}

type quota struct {
	Songs int64
	Space string
}

type mail struct {
	ServerName string `toml:"server_name"`
	Port       int64
	UserName   string `toml:"user_name"`
	Password   string
	Email      string
}

type oauth map[string]oauthProvider

type oauthProvider struct {
	Enabled  bool
	ClientID string `toml:"client_id"`
}
