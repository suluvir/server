package externals

import (
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
)

func init() {
	s := web.GetRouter().PathPrefix("/externals").Subrouter()
	s.HandleFunc("/{name}/{version}/{file}", ExternalHandler).Name(routeNames.EXTERNAL_RESOURCE)
}
