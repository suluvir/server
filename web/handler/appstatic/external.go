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

package appstatic

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/patrickmn/go-cache"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/web/dependencyLoader"
	"github.com/suluvir/server/web/httpHelpers"
	"go.uber.org/zap"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

const jsSuffix = ".js"
const cssSuffix = ".css"
const mapSuffix = ".map"

var fileCache *cache.Cache

func init() {
	fileCache = cache.New(30*time.Minute, 2*time.Hour)
}

func appStaticHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	externalName := vars["name"]
	externalVersion := vars["version"]
	externalFileName := vars["file"]

	cacheKey := fmt.Sprintf("%s%s%s", externalName, externalVersion, externalFileName)
	result, found := fileCache.Get(cacheKey)
	if found {
		setHeaders(&w, externalFileName)
		w.Write(result.([]byte))
		logging.GetLogger().Debug("serve from cache", zap.String("filename", externalFileName),
			zap.String("external", externalName))
		return
	}

	externalsExtractor := dependencyLoader.NewExtractor("layout/js/webpack.config.js", "layout/js/package.json")
	externals := externalsExtractor.ExtractExternals()

	for _, external := range externals {
		if external.Name == externalName && external.Version == externalVersion {
			if directory, ok := external.FileDirectoryMapping[externalFileName]; ok {
				fileLocation := fmt.Sprintf("%s/%s", directory, externalFileName)
				file, err := ioutil.ReadFile(fileLocation)
				if err != nil {
					logError(&w, external, externalFileName, err)
					return
				}
				setHeaders(&w, externalFileName)
				w.Write(file)
				fileCache.Set(cacheKey, file, cache.NoExpiration)
				return
			} else {
				logError(&w, external, externalFileName, nil)
				return
			}
		}
	}
}

func setHeaders(w *http.ResponseWriter, fileName string) {
	if strings.HasSuffix(fileName, jsSuffix) {
		(*w).Header().Add(httpHelpers.CONTENT_TYPE, httpHelpers.JS)
	} else if strings.HasSuffix(fileName, cssSuffix) {
		(*w).Header().Add(httpHelpers.CONTENT_TYPE, httpHelpers.CSS)
	} else if strings.HasSuffix(fileName, mapSuffix) {
		(*w).Header().Add(httpHelpers.CONTENT_TYPE, httpHelpers.SOURCEMAP)
	}
}

func logError(w *http.ResponseWriter, external dependencyLoader.External, externalFileName string, err error) {
	logging.GetLogger().Error("error during externals delivery",
		zap.String("external name", external.Name),
		zap.String("external version", external.Version),
		zap.String("file name", externalFileName),
		zap.Error(err))
	(*w).WriteHeader(http.StatusNotFound)
	return
}
