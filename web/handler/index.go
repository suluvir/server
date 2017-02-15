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
	"github.com/suluvir/server/web/dependencyLoader"
	"github.com/suluvir/server/web/printer"
	"net/http"
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
