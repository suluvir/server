package handler

import (
	"net/http"
	"github.com/suluvir/server/web/printer"
	"github.com/suluvir/server/web/webpack"
)

type indexTemplate struct {
	Externals []webpack.External
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	extractor := webpack.NewExtractor("layout/js/webpack.config.js", "layout/js/package.json")
	variables := indexTemplate{
		Externals: extractor.ExtractExternals(),
	}
	printer.PrintHtmlPageFromFile(w, "layout/html/defaulttemplate.html", variables)
}
