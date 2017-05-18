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

package handler

import (
	"fmt"
	"github.com/pborman/uuid"
	"github.com/suluvir/server/auth"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/tags"
	"github.com/suluvir/server/web/printer"
	"github.com/uber-go/zap"
	"io"
	"net/http"
	"os"
)

func uploadPageHandler(w http.ResponseWriter, r *http.Request) {
	printer.PrintHtmlPageFromFile(w, "templates/upload.html", nil)
}

func songUploadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(2 ^ 16)
	uploadedFile, uploadedFileHeader, err := r.FormFile("media")
	if err != nil {
		logging.GetLogger().Error("error during form file access", zap.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer uploadedFile.Close()

	uploadedFilename := uuid.NewUUID().String()
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
	song, _ := tags.ExtractTags(targetFileName, uploadedFileHeader.Filename, user)
	song.Filename = uploadedFilename
	song.Create()
}

// FIXME: remove this duplication
func getUploadFilePath(filename string) string {
	c := config.GetConfiguration()
	if c.Upload.Relative {
		return fmt.Sprintf("./%s/%s", c.Upload.Path, filename)
	}
	return fmt.Sprintf("%s/%s", c.Upload.Path, filename)
}
