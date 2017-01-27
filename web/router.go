package web

import (
	"github.com/gorilla/mux"
	"github.com/suluvir/server/web/handler"
	"github.com/suluvir/server/web/httpHelpers"
)

var router *mux.Router

func InitializeRouter() *mux.Router {
	if router != nil {
		return router
	}
	router = mux.NewRouter()
	applyRoutes()
	return router
}

func applyRoutes() {
	router.HandleFunc("/", handler.IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", handler.UploadPageHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", handler.SongUploadHandler).Methods(httpHelpers.POST)
}

func GetRouter() *mux.Router {
	if router == nil {
		return InitializeRouter()
	}
	return router
}
