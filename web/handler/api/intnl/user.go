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

package intnl

import (
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/httpHelpers"
	"go.uber.org/zap"
	"net/http"
)

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	user, err, statusCode := auth.MakeProviderUserCreation(w, r)
	if err != nil {
		logging.GetLogger().Error("error during user creation", zap.Error(err))
		api.SendJsonError(w, int(statusCode), err.Error())
	} else {
		httpHelpers.ServeJsonWithoutCache(w, &user)
	}
}

func loginUserHandler(w http.ResponseWriter, r *http.Request) {
	loginErr, statusCode := auth.MakeProviderLogin(w, r)
	if statusCode != http.StatusOK {
		api.SendJsonError(w, int(statusCode), loginErr.Error())
		return
	}
	api.SendJsonError(w, http.StatusOK, "")
}

func getQuotaHandler(w http.ResponseWriter, r *http.Request) {
	user := auth.MustGetUserForSession(w, r)
	var result = map[string]int64{}

	quotaBytes, quotaSongs := user.GetAvailableQuota()
	result["bytes"] = quotaBytes
	result["songs"] = quotaSongs

	httpHelpers.ServeJsonWithoutCache(w, &result)
}

func changePassword(w http.ResponseWriter, r *http.Request) {
	err := auth.ChangeUserPassword(w, r)
	if err != nil {
		api.SendJsonError(w, http.StatusBadRequest, err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func getMyUser(w http.ResponseWriter, r *http.Request) {
	user := auth.MustGetUserForSession(w, r)

	httpHelpers.ServeJsonWithoutCache(w, &user)
}
