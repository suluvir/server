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

package printer

import (
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
	"html/template"
	"net/http"
	"path"
)

// PrintHtmlPageFromFile takes in an response writer, a filename (relative to the base directory) and an interface
// containing that will be used as data when loading the given filename as template and executing the resulting
// template.
func PrintHtmlPageFromFile(w http.ResponseWriter, fileName string, data interface{}) {
	p := path.Join(environment.GetBaseDirectory(), fileName)
	logging.GetLogger().Debug("path for template", zap.String("path", p))
	t, parseErr := template.ParseFiles(p)
	if parseErr != nil {
		w.WriteHeader(http.StatusInternalServerError)
		logging.GetLogger().Error("error during template parsing", zap.Error(parseErr))
		return
	}
	execErr := t.Execute(w, data)
	if execErr != nil {
		logging.GetLogger().Error("error during template execution", zap.Error(execErr))
	}
}
