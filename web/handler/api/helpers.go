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

package api

import (
	"github.com/gorilla/mux"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

type errorResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
	Details string `json:"details"`
}

func GetObjectById(r *http.Request, o interface{}) {
	vars := mux.Vars(r)
	schema.GetDatabase().First(o, "id = ?", vars["id"])
}

func SendJsonError(w http.ResponseWriter, status int, details string) {
	response := errorResponse{
		Status:  status,
		Message: http.StatusText(status),
		Details: details,
	}

	w.WriteHeader(status)
	httpHelpers.ServeJsonWithoutCache(w, response)
}
