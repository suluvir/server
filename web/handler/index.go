package handler

import (
	"net/http"
	"github.com/suluvir/server/web/printer"
	"github.com/suluvir/server/web/dependencyLoader"
)

type indexTemplate struct {
	Externals []dependencyLoader.External
}

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	extractor := dependencyLoader.NewExtractor("layout/js/webpack.config.js", "layout/js/package.json")
	variables := indexTemplate{
		Externals: extractor.ExtractExternals(),
	}
	printer.PrintHtmlPageFromFile(w, "layout/html/defaulttemplate.html", variables)
}
