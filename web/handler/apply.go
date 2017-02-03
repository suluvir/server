package handler

import (
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
)

func init() {
	router := web.GetRouter()
	router.HandleFunc("/", IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", UploadPageHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", SongUploadHandler).Methods(httpHelpers.POST)
}
