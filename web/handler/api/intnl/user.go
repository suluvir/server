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
	"encoding/json"
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/httpHelpers"
	"go.uber.org/zap"
	"net/http"
)

type createUser struct {
	Username       string `json:"username"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	PasswordRepeat string `json:"password_repeat"`
}

type loginUser struct {
	Login        string `json:"login"`
	Password     string `json:"password"`
	StaySignedIn bool   `json:"stay_signed_in"`
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	var payload createUser
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&payload)
	if err != nil {
		logging.GetLogger().Error("error dezerializing request body", zap.Error(err))
		api.SendJsonError(w, http.StatusBadRequest, "error dezerializing request body")
		return
	}

	if payload.Password != payload.PasswordRepeat {
		api.SendJsonError(w, http.StatusBadRequest, "passwords do not match")
		return
	}

	user, err := auth.CreateUser(payload.Username, payload.Email, payload.Password)
	if err != nil {
		logging.GetLogger().Error("error during user creation", zap.Error(err))
		api.SendJsonError(w, http.StatusInternalServerError, err.Error())
	} else {
		httpHelpers.ServeJsonWithoutCache(w, &user)
	}
}

func loginUserHandler(w http.ResponseWriter, r *http.Request) {
	loginErr, statusCode := auth.MakeProviderLogin(w, r)
	if statusCode != http.StatusOK {
		api.SendJsonError(w, statusCode, loginErr.Error())
	}
}

func getQuotaHandler(w http.ResponseWriter, r *http.Request) {
	user := auth.MustGetUserForSession(w, r)
	var result = map[string]int64{}

	quotaBytes, quotaSongs := user.GetAvailableQuota()
	result["bytes"] = quotaBytes
	result["songs"] = quotaSongs

	httpHelpers.ServeJsonWithoutCache(w, &result)
}

func getMyUser(w http.ResponseWriter, r *http.Request) {
	user := auth.MustGetUserForSession(w, r)

	httpHelpers.ServeJsonWithoutCache(w, &user)
}
