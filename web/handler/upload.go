package handler

import (
	"net/http"
	"github.com/suluvir/server/web/printer"
	"os"
	"io"
	"github.com/suluvir/server/config"
	"fmt"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"github.com/suluvir/server/tags"
)

func UploadPageHandler(w http.ResponseWriter, r *http.Request) {
	printer.PrintHtmlPageFromFile(w, "templates/upload.html", nil)
}

func SongUploadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(2^16)
	uploadedFile, handler, err := r.FormFile("media")
	if err != nil {
		logging.GetLogger().Error("error during form file access", zap.Error(err))
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	defer uploadedFile.Close()
	targetFileName := getUploadFilePath(handler.Filename)
	targetFile, err := os.OpenFile(targetFileName, os.O_WRONLY | os.O_CREATE, 0666)
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

	song, _ := tags.ExtractTags(targetFileName)
	song.Create()
}

func getUploadFilePath(filename string) string {
	c := config.GetConfiguration()
	if c.Upload.Relative {
		return fmt.Sprintf("./%s/%s", c.Upload.Path, filename)
	}
	return fmt.Sprintf("%s/%s", c.Upload.Path, filename)
}
