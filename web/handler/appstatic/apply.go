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

package appstatic

import (
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
)

func init() {
	environment.RegisterCallback(applyRoutes, environment.ROUTER_INITIALIZED)
}

func applyRoutes() {
	s := web.GetRouter().Subrouter("/appstatic")
	s.HandleFunc("/{name}/{version}/{file}", appStaticHandler).Name(routeNames.EXTERNAL_RESOURCE)
}
