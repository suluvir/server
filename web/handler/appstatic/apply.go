package appstatic

import (
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
)

func init() {
	s := web.GetRouter().PathPrefix("/appstatic").Subrouter()
	s.HandleFunc("/{name}/{version}/{file}", AppStaticHandler).Name(routeNames.EXTERNAL_RESOURCE)
}
