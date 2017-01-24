package web

import (
	"github.com/gorilla/mux"
	"github.com/suluvir/server/web/handler"
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/suluvir/server/web/handler/api/v1"
)

func CreateRouter() *mux.Router {
	router := mux.NewRouter()
	return router
}

func ApplyRoutes(router *mux.Router) {
	router.HandleFunc("/", handler.IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", handler.UploadPageHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", handler.SongUploadHandler).Methods(httpHelpers.POST)

	apiV1 := router.PathPrefix("/api/v1").Subrouter()
	v1.ApplyRoutes(apiV1)
}
