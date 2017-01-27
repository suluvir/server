package v1

import (
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/suluvir/server/web"
)

func init() {
	router := web.GetRouter().PathPrefix("/api/v1").Subrouter()
	router.HandleFunc("/song/{id:[0-9]+}", SongApiHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/artist/{id:[0-9]+}", ArtistApiHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/album/{id:[0-9]+}", AlbumApiHandler).Methods(httpHelpers.GET)
}
