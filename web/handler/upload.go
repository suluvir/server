package handler

import (
	"net/http"
	"github.com/suluvir/server/web/printer"
	"os"
	"io"
	"github.com/suluvir/server/config"
	"fmt"
)

func UploadPageHandler(w http.ResponseWriter, r *http.Request) {
	printer.PrintHtmlPageFromFile(w, "templates/upload.html", nil)
}

func SongUploadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(2^16)
	uploadedFile, handler, err := r.FormFile("media")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	defer uploadedFile.Close()
	targetFile, err := os.OpenFile(getUploadFilePath(handler.Filename), os.O_WRONLY | os.O_CREATE, 0666)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}
	defer targetFile.Close()
	io.Copy(targetFile, uploadedFile)

}

func getUploadFilePath(filename string) string {
	c := config.GetConfiguration()
	if c.Upload.Relative {
		return fmt.Sprintf("./%s/%s", c.Upload.Path, filename)
	}
	return fmt.Sprintf("%s/%s", c.Upload.Path, filename)
}
