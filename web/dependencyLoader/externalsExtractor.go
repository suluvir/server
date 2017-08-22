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

package dependencyLoader

import (
	"encoding/json"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
	"io/ioutil"
	"path"
	"regexp"
	"strings"
)

type ExternalsExtractor struct {
	webpackConfigPath string
	packageJsonPath   string

	packageContent packageContent
}

type externalsContent struct {
	Externals []string
}

type packageContent struct {
	Dependencies map[string]string `json:"dependencies"`
	Name         string            `json:"name"`
	Version      string            `json:"version"`
}

// NewExtractor returns a new ExternalsExtractor. Given paths are treated relatively to suluvir base directory
func NewExtractor(webpackPath string, packagePath string) *ExternalsExtractor {
	return &ExternalsExtractor{
		webpackConfigPath: path.Join(environment.GetBaseDirectory(), webpackPath),
		packageJsonPath:   path.Join(environment.GetBaseDirectory(), packagePath),
	}
}

func (e *ExternalsExtractor) ExtractExternals() []External {
	webpackConfigContent, err := e.readWebpackExternals()
	if err != nil {
		return []External{}
	}

	externalNames := e.extractExternalNames(webpackConfigContent)

	externals, err := e.extractExternalVersions(externalNames)
	if err != nil {
		logging.GetLogger().Error("error extracting external versions", zap.Error(err))
	}

	fileExtractor := NewExternalFileExtractor(externals)
	externals = fileExtractor.LookupExternalFiles()

	var result []External
	for _, e := range externals {
		e.SetUrl()
		result = append(result, e)
	}

	suluvirExternal := e.GetSuluvirExternal()
	suluvirExternal.SetUrl()
	result = append(result, suluvirExternal)

	return result
}

func (e *ExternalsExtractor) readWebpackExternals() (string, error) {
	buf, err := ioutil.ReadFile(e.webpackConfigPath)
	if err != nil {
		logging.GetLogger().Error("error while loading webpack config file",
			zap.String("file", e.webpackConfigPath),
			zap.Error(err))
		return "", err
	}
	return string(buf), nil
}

func (e *ExternalsExtractor) extractExternalNames(content string) []string {
	externalsRegex, _ := regexp.Compile("(externals: {[^$]*\"\\s*})")
	makeListRegex, _ := regexp.Compile("\"([^\"]+)\":[^\"]*\"[^\"]+\"")

	externalsString := externalsRegex.FindString(content)
	externalsString = makeListRegex.ReplaceAllString(externalsString, `"$1"`)
	externalsString = strings.Replace(externalsString, "{", "[", -1)
	externalsString = strings.Replace(externalsString, "}", "]}", -1)
	externalsString = strings.Replace(externalsString, "externals:", "{\"externals\":", -1)

	logging.GetLogger().Debug("got externals list", zap.String("externals", externalsString))

	var externalContent externalsContent
	parseErr := json.Unmarshal([]byte(externalsString), &externalContent)
	if parseErr != nil {
		logging.GetLogger().Error("error during webpack config parse",
			zap.Error(parseErr))
	}

	return externalContent.Externals
}

func (e *ExternalsExtractor) extractExternalVersions(externalNames []string) ([]External, error) {
	e.readPackageJson()

	externals := []External{}
	for _, externalName := range externalNames {
		if version, ok := e.packageContent.Dependencies[externalName]; ok {
			external := NewExternal(externalName, normalizeVersion(version))
			externals = append(externals, external)
		}
	}

	return externals, nil
}

func (e *ExternalsExtractor) readPackageJson() error {
	if e.packageContent.Name != "" {
		// package.json has been already read
		return nil
	}

	buf, err := ioutil.ReadFile(e.packageJsonPath)
	if err != nil {
		logging.GetLogger().Error("error while loading package.json",
			zap.String("file", e.packageJsonPath),
			zap.Error(err))
		return err
	}

	var packageContents packageContent
	parseErr := json.Unmarshal(buf, &packageContents)
	e.packageContent = packageContents
	if parseErr != nil {
		logging.GetLogger().Error("error while parsing package.json",
			zap.Error(parseErr),
			zap.String("content", string(buf)),
			zap.String("file", e.packageJsonPath))
		return parseErr
	}
	return nil
}

func (e *ExternalsExtractor) GetSuluvirExternal() External {
	e.readPackageJson()

	return External{
		HasJs:    true,
		JsFiles:  []string{"suluvir.js"},
		CssFiles: []string{"suluvir.css"},
		HasCss:   false,
		Version:  e.packageContent.Version,
		Name:     e.packageContent.Name,
		FileDirectoryMapping: map[string]string{
			"suluvir.js":      path.Join(environment.GetBaseDirectory(), "layout", "js", "dist"),
			"suluvir.js.map":  path.Join(environment.GetBaseDirectory(), "layout", "js", "dist"),
			"suluvir.css":     path.Join(environment.GetBaseDirectory(), "layout", "js", "dist"),
			"suluvir.css.map": path.Join(environment.GetBaseDirectory(), "layout", "js", "dist"),
		},
	}
}

func normalizeVersion(version string) string {
	return strings.Replace(version, "^", "", -1)
}
