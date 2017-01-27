package handler

import (
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/suluvir/server/web"
)

func init() {
	router := web.GetRouter()
	router.HandleFunc("/", IndexHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", UploadPageHandler).Methods(httpHelpers.GET)
	router.HandleFunc("/upload", SongUploadHandler).Methods(httpHelpers.POST)
}
