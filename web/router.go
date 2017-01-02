package web

import (
	"github.com/gorilla/mux"
	"github.com/suluvir/server/web/handler"
	"github.com/suluvir/server/web/http"
)

func CreateRouter() *mux.Router {
	router := mux.NewRouter()
	return router
}

func ApplyRoutes(router *mux.Router) {
	router.HandleFunc("/", handler.IndexHandler).Methods(http.GET)
	router.HandleFunc("/upload", handler.UploadPageHandler).Methods(http.GET)
	router.HandleFunc("/upload", handler.SongUploadHandler).Methods(http.POST)
}
