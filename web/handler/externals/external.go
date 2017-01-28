package externals

import (
	"net/http"
	"github.com/suluvir/server/web/dependencyLoader"
	"github.com/gorilla/mux"
	"io/ioutil"
	"fmt"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"github.com/suluvir/server/web/httpHelpers"
	"strings"
)

const jsSuffix = ".js"
const cssSuffix = ".css"
const mapSuffix = ".map"

func ExternalHandler(w http.ResponseWriter, r *http.Request) {
	externalsExtractor := dependencyLoader.NewExtractor("layout/js/webpack.config.js", "layout/js/package.json")
	externals := externalsExtractor.ExtractExternals()

	vars := mux.Vars(r)
	externalName := vars["name"]
	externalVersion := vars["version"]
	externalFileName := vars["file"]

	for _, external := range externals {
		if external.Name == externalName && external.Version == externalVersion {
			fileLocation := fmt.Sprintf("%s/%s", external.Directory, externalFileName)
			file, err := ioutil.ReadFile(fileLocation)
			if err != nil {
				logging.GetLogger().Error("error during externals delivery",
					zap.String("external name", external.Name),
					zap.String("external version", external.Version),
					zap.String("file name", externalFileName))
				w.WriteHeader(http.StatusNotFound)
				return
			}
			setHeaders(&w, externalFileName)
			w.Write(file)
			return
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
