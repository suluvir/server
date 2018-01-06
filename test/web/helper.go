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

package web

import (
	"github.com/suluvir/server/web"
	"net/http"
	"net/http/httptest"
)

// ExecuteRequest is a test helper to fake a request. Use it as follows:
//
//     r := httptest.NewRequest("GET", "/api/v1/internal/my/songs", nil)
//     resp := ExecuteRequest(r)
func ExecuteRequest(r *http.Request) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	web.GetRouter().GetMuxRouterForTestingPurposes().ServeHTTP(rr, r)

	return rr
}
