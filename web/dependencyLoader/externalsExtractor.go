package dependencyLoader

import (
	"io/ioutil"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"strings"
	"encoding/json"
	"regexp"
)

type ExternalsExtractor struct {
	webpackConfigPath string
	packageJsonPath string
}

type externalsContent struct {
	Externals []string
}

type packageContent struct {
	Dependencies map[string]string `json:"dependencies"`
}

func NewExtractor(webpackPath string, packagePath string) *ExternalsExtractor {
	return &ExternalsExtractor{
		webpackConfigPath: webpackPath,
		packageJsonPath: packagePath,
	}
}

func (e *ExternalsExtractor) ExtractExternals() []External {
	webpackConfigContent, err := e.readWebpackExternals()
	if err != nil {
		return []External{}
	}

	externalNames := e.extractExternalNames(webpackConfigContent)
	logging.GetLogger().Info("extract external names",
		zap.String("file", e.webpackConfigPath), zap.Object("names", externalNames))

	externals, err := e.extractExternalVersions(externalNames)
	if err != nil {
		logging.GetLogger().Error("error extracting external versions", zap.Error(err))
	}

	logging.GetLogger().Debug("extracted externals, continue extracting external files",
		zap.Object("externals", externals))

	fileExtractor := NewExternalFileExtractor(externals)
	externals = fileExtractor.LookupExternalFiles()

	var result []External
	for _, e := range externals {
		e.SetUrl()
		result = append(result, e)
	}

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
	buf, err := ioutil.ReadFile(e.packageJsonPath)
	if err != nil {
		logging.GetLogger().Error("error while loading package.json",
			zap.String("file", e.packageJsonPath),
			zap.Error(err))
		return []External{}, err
	}

	var packageContents packageContent
	parseErr := json.Unmarshal(buf, &packageContents)
	if parseErr != nil {
		logging.GetLogger().Error("error while parsing package.json",
			zap.Error(parseErr),
			zap.String("content", string(buf)),
			zap.String("file", e.packageJsonPath))
	}

	logging.GetLogger().Info("read package.json", zap.Object("content", packageContents))

	externals := []External{}
	for _, externalName := range externalNames {
		if version, ok := packageContents.Dependencies[externalName]; ok {
			external := NewExternal(externalName, normalizeVersion(version))
			externals = append(externals, external)
		}
	}

	return externals, nil
}

func normalizeVersion(version string) string {
	return strings.Replace(version, "^", "", -1)
}
