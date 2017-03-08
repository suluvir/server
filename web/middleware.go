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
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"net/http"
	"time"
)

func logMiddleWare(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		logging.GetLogger().Debug("incoming request start", zap.String("url", r.URL.String()))
		next.ServeHTTP(w, r)
		elapsed := time.Since(start)
		logging.GetLogger().Debug("incoming request finished",
			zap.String("url", r.URL.String()),
			zap.String("elapsed", fmt.Sprintf("%s", elapsed)))
	})
}
