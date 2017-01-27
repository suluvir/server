package webpack

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
	Externals map[string]string
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

	logging.GetLogger().Debug("extracted externals", zap.Object("externals", externals))

	return externals
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
	content = strings.Replace(content, "module.exports = ", "", -1) // remove module export at the beginning
	content = strings.Replace(content, "__dirname + ", "", -1) // remove the special __dirname constant
	content = strings.Replace(content, ";", "", -1) // remove semicolon at the end of the file
	content = strings.Replace(content, "'", "\"", -1) // maje single quotes double quotes

	commentRegex, _ := regexp.Compile("//.*")
	quoteRegex, _ := regexp.Compile("([a-zA-Z]+):")
	regexRegex, _ := regexp.Compile("\\s/.*/")

	content = commentRegex.ReplaceAllString(content, "") // remove comments
	content = quoteRegex.ReplaceAllString(content, `"$1":`) // make double quotes around keywords
	content = regexRegex.ReplaceAllString(content, "\"\"") // remove regexes in code, as we don't need them


	byteContent := []byte(content)
	var parsed externalsContent
	err := json.Unmarshal(byteContent, &parsed)

	if err != nil {
		logging.GetLogger().Error("error parsing webpack config",
			zap.Error(err),
			zap.String("file", e.webpackConfigPath),
			zap.String("content", content))
		return []string{}
	}

	keys := make([]string, len(parsed.Externals))
	i := 0
	for k := range parsed.Externals {
		keys[i] = k
		i++
	}
	return keys
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
			external := NewExternal(externalName, normalizeVersion(version), false)
			external.SetUrl()
			externals = append(externals, external)
		}
	}

	return externals, nil
}

func normalizeVersion(version string) string {
	return strings.Replace(version, "^", "", -1)
}
