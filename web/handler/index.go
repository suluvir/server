package handler

import (
	"net/http"
	"github.com/suluvir/server/web/printer"
	"github.com/suluvir/server/web/webpack"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	extractor := webpack.NewExtractor("layout/js/webpack.config.js")
	printer.PrintHtmlPageFromFile(w, "layout/html/defaulttemplate.html", extractor.ExtractExternals())
}
