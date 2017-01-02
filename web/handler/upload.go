package handler

import (
	"net/http"
	"github.com/suluvir/server/web/printer"
)

func UploadPageHandler(w http.ResponseWriter, r *http.Request) {
	printer.PrintHtmlPageFromFile(w, "test.html")
}
