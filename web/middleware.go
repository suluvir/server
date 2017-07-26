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
	"github.com/suluvir/server/util"
	"go.uber.org/zap"
	"net/http"
	"sort"
)

var prioritizedMiddlewares = map[int]*func(http.Handler) http.Handler{}

// some well known middlewares with given priorities
const (
	// LOG_MIDDLEWARE_PRIORITY sets the priority for the log middleware
	LOG_MIDDLEWARE_PRIORITY = 0
	// AUTHENTICATION_MIDDLEWARE_PRIORITY sets the priority for the authentication middleware
	AUTHENTICATION_MIDDLEWARE_PRIORITY = 1
	// PERMISSION_MIDDLEWARE_PRIORITY sets the priority for the permission middleware
	PERMISSION_MIDDLEWARE_PRIORITY = 2
)

func init() {
	// we cannot apply the log middleware in the log package, since this package uses the log package and
	// this would lead to an import cycle
	AddPrioritizedMiddleware(logging.LogMiddleWare, LOG_MIDDLEWARE_PRIORITY)
}

// AddPrioritizedMiddleware adds a middleware with a priority to the stack of middlewares for each request. The higher
// the priority, the earlier this middleware will be executed. All other middlewares will be executed after the
// prioritized ones. This function will log an error and not adds the middleware if two middlewares with the same
// priority are given.
// This function returns a boolean indicating the success of adding the middleware to the stack.
func AddPrioritizedMiddleware(middleware func(http.Handler) http.Handler, priority int) bool {
	m := prioritizedMiddlewares[priority]
	if m != nil {
		logging.GetLogger().Error("two middlewares with the same priority given, not adding middleware",
			zap.Int("priority", priority))
		return false
	}

	name := util.GetReflectionName(middleware)
	logging.GetLogger().Info("add middleware", zap.Int("priority", priority), zap.String("name", name))

	prioritizedMiddlewares[priority] = &middleware
	return true
}

func applyMiddleware(handler http.Handler) http.Handler {
	if len(prioritizedMiddlewares) == 0 {
		// there are no registered middlewares (this cannot happen, but just in case...)
		return handler
	}

	keys := make([]int, len(prioritizedMiddlewares))
	i := 0
	for k := range prioritizedMiddlewares {
		keys[i] = k
		i += 1
	}

	sort.Sort(sort.Reverse(sort.IntSlice(keys)))

	result := handler

	handlerName := util.GetReflectionName(handler)
	for j := 0; j < len(keys); j++ {
		middlewareName := util.GetReflectionName(*prioritizedMiddlewares[keys[j]])
		logging.GetLogger().Debug("apply middleware for handler", zap.String("handler", handlerName),
			zap.Int("priority", keys[j]),
			zap.String("name", middlewareName))
		result = (*prioritizedMiddlewares[keys[j]])(result)
	}

	return result
}
