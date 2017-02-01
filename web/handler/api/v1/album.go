package v1

import (
	"github.com/suluvir/server/schema/media"
	"net/http"
)

func AlbumApiHandler(w http.ResponseWriter, r *http.Request) {
	var album media.Album
	ResponseSingleObject(w, r, &album)
}
