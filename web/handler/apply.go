package handler

import (
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func init() {
	router := web.GetRouter()
	router.HandleFunc("/", IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", UploadPageHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", SongUploadHandler).Methods(httpHelpers.POST)

	router.PathPrefix("/static").Handler(http.StripPrefix("/static", http.FileServer(http.Dir("layout/static/"))))
	router.PathPrefix("/nodestatic").Handler(http.StripPrefix("/nodestatic", http.FileServer(http.Dir("layout/js/node_modules"))))
}
