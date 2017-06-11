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

package setup

import (
	"encoding/json"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
	"net/http"
)

var callbacks = []func(r *http.Request) (string, interface{}){}

// AddCallBack can be used for adding a callback which is called for every request to fill the window.setup
// return an empty string, if you not want to add something to the setup for a specific request. Return a unique(!)
// key and some value, which must be json serializable.
func AddCallBack(callback func(r *http.Request) (string, interface{})) {
	callbacks = append(callbacks, callback)
}

func GetSetup(r *http.Request) string {
	var resultMap = map[string]interface{}{}
	for _, callback := range callbacks {
		key, value := callback(r)
		resultMap[key] = value
	}
	result, err := json.Marshal(resultMap)
	if err != nil {
		logging.GetLogger().Error("error while generating setup", zap.Error(err))
	}
	return string(result)
}
