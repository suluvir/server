package v1

import (
	"net/http"
	"github.com/suluvir/server/schema/media"
)

func AlbumApiHandler(w http.ResponseWriter, r *http.Request) {
	var album media.Album;
	ResponseSingleObject(w, r, &album)
}
