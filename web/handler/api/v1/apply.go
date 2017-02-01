package v1

import (
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/suluvir/server/web/routeNames"
)

func init() {
	s := web.GetRouter().PathPrefix("/api/v1").Subrouter()
	s.HandleFunc("/song/{id:[0-9]+}", SongApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_SONG)
	s.HandleFunc("/artist/{id:[0-9]+}", ArtistApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_ARTIST)
	s.Path("/album/{id:[0-9]+}").HandlerFunc(AlbumApiHandler).Methods(httpHelpers.GET).Name(routeNames.API_ALBUM)
}
