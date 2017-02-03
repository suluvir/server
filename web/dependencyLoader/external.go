package dependencyLoader

import (
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"github.com/uber-go/zap"
)

type External struct {
	Name    string
	Version string
	HasCss  bool
	HasJs   bool
	JsUrls  []string
	CssUrls []string

	JsFiles  []string
	CssFiles []string

	FileDirectoryMapping map[string]string
}

func (e *External) SetUrl() {

	e.HasJs = len(e.JsFiles) > 0
	e.HasCss = len(e.CssFiles) > 0

	if e.HasJs {
		e.JsUrls = []string{}
		for _, jsFile := range e.JsFiles {
			jsUrl, jsErr := web.GetRouter().Get(routeNames.EXTERNAL_RESOURCE).URL(
				"name", e.Name,
				"version", e.Version,
				"file", jsFile)

			if jsErr != nil {
				logging.GetLogger().Error("error during url generation for external js url",
					zap.Error(jsErr), zap.String("external name", e.Name), zap.String("external version", e.Version))
			}
			url := jsUrl.String()
			e.JsUrls = append(e.JsUrls, url)
			logging.GetLogger().Debug("generated js url", zap.String("url", url))
		}
	}

	if e.HasCss {
		e.CssUrls = []string{}
		for _, cssFile := range e.CssFiles {
			cssUrl, cssErr := web.GetRouter().Get(routeNames.EXTERNAL_RESOURCE).URL(
				"name", e.Name,
				"version", e.Version,
				"file", cssFile)

			if cssErr != nil {
				logging.GetLogger().Error("error during url generation for external css url",
					zap.Error(cssErr), zap.String("external name", e.Name), zap.String("external version", e.Version))
			}
			url := cssUrl.String()
			e.CssUrls = append(e.CssUrls, url)
			logging.GetLogger().Debug("generated css url", zap.String("url", url))
		}
	}
}

func NewExternal(name string, version string) External {
	return External{
		Name:                 name,
		Version:              version,
		HasCss:               false,
		HasJs:                false,
		JsFiles:              []string{},
		CssFiles:             []string{},
		JsUrls:               []string{},
		CssUrls:              []string{},
		FileDirectoryMapping: map[string]string{},
	}
}
