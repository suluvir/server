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

package web

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/suluvir/server/config"
)

var router *mux.Router

const httpPort = 80
const httpsPort = 443

func InitializeRouter() *mux.Router {
	if router != nil {
		return router
	}
	router = mux.NewRouter().Host(getHostname()).Subrouter()
	return router
}

func getHostname() string {
	c := config.GetConfiguration()
	if c.Web.Port == httpPort || c.Web.Port == httpsPort {
		return c.Web.Hostname
	}
	return fmt.Sprintf("%s:%d", c.Web.Hostname, c.Web.Port)
}

func GetRouter() *mux.Router {
	if router == nil {
		return InitializeRouter()
	}
	return router
}
