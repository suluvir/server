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

package httpHelpers

import (
	"encoding/json"
	"net/http"
)

func ServeJsonWithoutCache(w http.ResponseWriter, v interface{}) error {
	w.Header().Set(CONTENT_TYPE, JSON)
	w.Header().Set(CACHE_CONTROL, NO_CACHE)
	w.Header().Set(EXPIRES, "-1")
	return json.NewEncoder(w).Encode(v)
}
