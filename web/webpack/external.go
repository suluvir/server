package webpack

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
	JsUrl string
	CssUrl string
}

func (e *External) SetUrl() {
	jsUrl, jsErr := web.GetRouter().Get(routeNames.EXTERNAL_RESOURCE).URL(
		"name", e.Name,
		"version", e.Version,
		"type", "js")

	if jsErr != nil {
		logging.GetLogger().Error("error during url generation for external js url",
			zap.Error(jsErr), zap.String("external name", e.Name), zap.String("external version", e.Version))
	}

	cssUrl, cssErr := web.GetRouter().Get(routeNames.EXTERNAL_RESOURCE).URL(
		"name", e.Name,
		"version", e.Version,
		"type", "css")

	if cssErr != nil {
		logging.GetLogger().Error("error during url generation for external css url",
			zap.Error(cssErr), zap.String("external name", e.Name), zap.String("external version", e.Version))
	}


	e.JsUrl = jsUrl.String()
	e.CssUrl = cssUrl.String()
}

func NewExternal(name string, version string, hasCss bool) External {
	return External{
		Name: name,
		Version: version,
		HasCss: hasCss,
	}
}
