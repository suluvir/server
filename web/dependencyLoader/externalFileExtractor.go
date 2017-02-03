package dependencyLoader

import (
	"fmt"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"os"
)

type ExternalFileExtractor struct {
	Externals []External
}

const externalBaseDir = "layout/js/node_modules"

var searchInDirectories = []string{
	"dist",
	"out",
	"extra",
}

const jsFileSuffix = ".min.js"
const cssFileSuffix = ".css"

func NewExternalFileExtractor(externals []External) *ExternalFileExtractor {
	return &ExternalFileExtractor{
		Externals: externals,
	}
}

// this function looks up the external files. It tries an exact match with the external name, for exceptions define
// the file to use in `specialFiles.go`
// FIXME too much duplicated code...
func (e *ExternalFileExtractor) LookupExternalFiles() []External {
	var result []External
	for _, external := range e.Externals {
		for _, searchInDirectory := range searchInDirectories {
			externalBaseDir := fmt.Sprintf("%s/%s/%s", externalBaseDir, external.Name, searchInDirectory)

			if !external.HasJs {
				if specialJsFiles, ok := SPECIAL_EXTERNAL_JS_FILES[external.Name]; ok {
					for _, specialJsFile := range specialJsFiles {
						specialJsFileDir := fmt.Sprintf("%s/%s", externalBaseDir, specialJsFile)
						if _, err := os.Stat(specialJsFileDir); err == nil {
							external.FileDirectoryMapping[specialJsFile] = externalBaseDir
							external.JsFiles = append(external.JsFiles, specialJsFile)
							logging.GetLogger().Info("found special externals file",
								zap.String("path", specialJsFileDir))
						} else {
							logging.GetLogger().Warn("specal external file given does not exist",
								zap.String("filename", specialJsFile),
								zap.String("expected path", specialJsFileDir))
						}
					}
				} else {
					externalDir := fmt.Sprintf("%s/%s%s", externalBaseDir, external.Name, jsFileSuffix)
					if _, err := os.Stat(externalDir); err == nil {
						jsFile := fmt.Sprintf("%s%s", external.Name, jsFileSuffix)
						external.FileDirectoryMapping[jsFile] = externalBaseDir
						external.JsFiles = append(external.JsFiles, jsFile)
						logging.GetLogger().Info("found externals file",
							zap.String("path", externalDir))
					} else {
						logging.GetLogger().Warn("unable to find externals file",
							zap.String("expected path", externalDir))
					}
				}
			}

			if !external.HasCss {
				if specialCssFile, ok := SPECIAL_EXTERNAL_CSS_FILES[external.Name]; ok {
					specialCssFileDir := fmt.Sprintf("%s/%s", externalBaseDir, specialCssFile)
					if _, err := os.Stat(specialCssFileDir); err == nil {
						external.FileDirectoryMapping[specialCssFile] = externalBaseDir
						external.CssFiles = append(external.CssFiles, specialCssFile)
						logging.GetLogger().Info("found special externals file",
							zap.String("path", specialCssFileDir))
					} else {
						logging.GetLogger().Warn("specal external file given does not exist",
							zap.String("filename", specialCssFile),
							zap.String("expected path", specialCssFileDir))
					}
				} else {
					externalDir := fmt.Sprintf("%s/%s%s", externalBaseDir, external.Name, cssFileSuffix)
					if _, err := os.Stat(externalDir); err == nil {
						cssFile := fmt.Sprintf("%s%s", external.Name, cssFileSuffix)
						external.FileDirectoryMapping[cssFile] = externalBaseDir
						external.CssFiles = append(external.CssFiles, cssFile)
						logging.GetLogger().Info("found externals file",
							zap.String("path", externalDir))
					} else {
						logging.GetLogger().Warn("unable to find externals file",
							zap.String("extected path", externalDir))
					}
				}
			}
		}
		result = append(result, external)
	}

	return result
}
