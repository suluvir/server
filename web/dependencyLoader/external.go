package dependencyLoader

import (
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
)

type External struct {
	Name string
	Version string
	HasCss bool
	HasJs bool
	JsUrl string
	CssUrl string

	Directory string
	JsFile string
	CssFile string
}

func (e *External) SetUrl() {

	if e.HasJs {
		jsUrl, jsErr := web.GetRouter().Get(routeNames.EXTERNAL_RESOURCE).URL(
			"name", e.Name,
			"version", e.Version,
			"file", e.JsFile)

		if jsErr != nil {
			logging.GetLogger().Error("error during url generation for external js url",
				zap.Error(jsErr), zap.String("external name", e.Name), zap.String("external version", e.Version))
		}
		e.JsUrl = jsUrl.String()
		logging.GetLogger().Debug("generated js url", zap.String("url", e.JsUrl))
	}

	if e.HasCss {
		cssUrl, cssErr := web.GetRouter().Get(routeNames.EXTERNAL_RESOURCE).URL(
			"name", e.Name,
			"version", e.Version,
			"file", e.CssFile)

		if cssErr != nil {
			logging.GetLogger().Error("error during url generation for external css url",
				zap.Error(cssErr), zap.String("external name", e.Name), zap.String("external version", e.Version))
		}
		e.CssUrl = cssUrl.String()
		logging.GetLogger().Debug("generated css url", zap.String("url", e.CssUrl))
	}
}

func NewExternal(name string, version string) External {
	return External{
		Name: name,
		Version: version,
	}
}
