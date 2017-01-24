package v1

import (
	"github.com/gorilla/mux"
	"github.com/suluvir/server/web/httpHelpers"
)

func ApplyRoutes(router *mux.Router) {
	router.HandleFunc("/song/{id:[0-9]+}", SongApiHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/artist/{id:[0-9]+}", ArtistApiHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/album/{id:[0-9]+}", AlbumApiHandler).Methods(httpHelpers.GET)
}
