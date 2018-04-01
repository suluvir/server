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

package intnl

import (
	"errors"
	"fmt"
	"github.com/pborman/uuid"
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/tags"
	"github.com/suluvir/server/web/handler/api"
	"github.com/suluvir/server/web/httpHelpers"
	"go.uber.org/zap"
	"io"
	"mime/multipart"
	"net/http"
	"os"
)

func songUploadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(2 ^ 16)
	uploadedFile, uploadedFileHeader, err := r.FormFile("media")

	uploadAllowedErr := checkIfUploadAllowed(w, r, uploadedFileHeader)
	if uploadAllowedErr != nil {
		// the users quota is reached. Don't log it
		api.SendJsonError(w, http.StatusForbidden, uploadAllowedErr.Error())
		return
	}

	if err != nil {
		logging.GetLogger().Error("error during form file access", zap.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer uploadedFile.Close()

	uploadedFilename := uuid.NewRandom().String()
	targetFileName := getUploadFilePath(uploadedFilename)
	targetFile, err := os.OpenFile(targetFileName, os.O_WRONLY|os.O_CREATE, 0666)
	logging.GetLogger().Info("uploading new media", zap.String("target file name", targetFileName))
	defer targetFile.Close()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		logging.GetLogger().Error("error during file opening", zap.Error(err))
		return
	}
	bytesWritten, err := io.Copy(targetFile, uploadedFile)
	if err != nil {
		logging.GetLogger().Error("error during file copy", zap.Error(err))
		return
	}
	logging.GetLogger().Info("file copy complete", zap.Int64("bytes written", bytesWritten))

	user := auth.MustGetUserForSession(w, r)
	song := tags.ExtractTagsSynchronously(user, targetFileName, uploadedFileHeader.Filename)
	song.Filename = uploadedFilename
	song.Create()

	httpHelpers.ServeJsonWithoutCache(w, &song)
}

func checkIfUploadAllowed(w http.ResponseWriter, r *http.Request, fh *multipart.FileHeader) error {
	user := auth.MustGetUserForSession(w, r)
	freeSpace, allowedSongs := user.GetAvailableQuota()

	if freeSpace < fh.Size || allowedSongs < 1 {
		return errors.New("Your quota is reached")
	}
	return nil
}

// FIXME: remove this duplication
func getUploadFilePath(filename string) string {
	c := config.GetConfiguration()
	if c.Upload.Relative {
		return fmt.Sprintf("./%s/%s", c.Upload.Path, filename)
	}
	return fmt.Sprintf("%s/%s", c.Upload.Path, filename)
}
