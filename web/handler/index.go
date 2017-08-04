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
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/web/dependencyLoader"
	"github.com/suluvir/server/web/printer"
	"github.com/suluvir/server/web/setup"
	"go.uber.org/zap"
	"html/template"
	"io/ioutil"
	"net/http"
	"path"
)

type indexTemplate struct {
	Externals          []dependencyLoader.External
	ExternalJavascript []string
	Setup              string
	GreetingMessage    template.HTML
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	extractor := dependencyLoader.NewExtractor("layout/js/webpack.config.js", "layout/js/package.json")
	variables := indexTemplate{
		Externals:          extractor.ExtractExternals(),
		Setup:              setup.GetSetup(r),
		GreetingMessage:    greetingMessage(),
		ExternalJavascript: dependencyLoader.GetExternalJavascripts(),
	}
	printer.PrintHtmlPageFromFile(w, "layout/html/defaulttemplate.html", variables)
}

func greetingMessage() template.HTML {
	greetingFile := path.Join(environment.GetBaseDirectory(), "layout", "static", "greetingmessage.txt")
	buffer, err := ioutil.ReadFile(greetingFile)
	if err != nil {
		logging.GetLogger().Error("error reading greeting file", zap.Error(err))
		return template.HTML("<!--\nthere happened an error, so I'm not able to show a nice message here :(\n-->")
	}

	message := fmt.Sprintf("<!--\n%s\n-->", string(buffer))
	return template.HTML(message)
}
