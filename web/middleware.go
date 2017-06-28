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
	"github.com/suluvir/server/logging"
	"net/http"
)

var middlewares = []func(next http.Handler) http.Handler{}

func init() {
	// we cannot apply the log middleware in the log package, since this package uses the log package and
	// this would lead to an import cycle
	AddMiddleware(logging.LogMiddleWare)
}

// AddMiddleware needs to be called in init() to make sure all middleware has been registered when the routes are constructed
func AddMiddleware(middleware func(next http.Handler) http.Handler) {
	middlewares = append(middlewares, middleware)
}

func applyMiddleware(handler http.Handler) http.Handler {
	if len(middlewares) == 0 {
		// there are no registered middlewares (this cannot happen, but just in case...)
		return handler
	}

	result := middlewares[0](handler)

	for i := 1; i < len(middlewares); i++ {
		result = middlewares[i](result)
	}

	return result
}
