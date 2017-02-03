package v1

import (
	"github.com/suluvir/server/schema/media"
	"net/http"
)

func ArtistApiHandler(w http.ResponseWriter, r *http.Request) {
	var artist media.Artist
	ResponseSingleObject(w, r, &artist)
}
