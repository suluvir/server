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

package v1

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/httpHelpers"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http"
)

func songApiStreamHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var song media.Song
	schema.GetDatabase().First(&song, "id = ?", vars["id"])

	songFilePath, err := song.GetUploadFilePath()
	if err != nil {
		logging.GetLogger().Error("error during song file path calculation", zap.Error(err))
	}

	songData, readErr := ioutil.ReadFile(songFilePath)
	if readErr != nil {
		logging.GetLogger().Error("error during song reading", zap.Error(readErr))
	}

	contentType, typeErr := httpHelpers.GetContentType(song.Type)
	if typeErr != nil {
		logging.GetLogger().Error("error during content type calculation", zap.Error(typeErr))
	}

	contentDisposition := fmt.Sprintf("inline;filename=\"%s.%s\"", song.Title, song.Type)
	w.Header().Add(httpHelpers.CONTENT_TYPE, contentType)
	w.Header().Add(httpHelpers.CONTENT_DISPOSITION, contentDisposition)
	w.Header().Add(httpHelpers.CONTENT_LENGTH, fmt.Sprintf("%d", song.Size))
	w.Write(songData)
}
