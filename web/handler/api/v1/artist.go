package v1

import (
	"net/http"
	"github.com/suluvir/server/schema/media"
)

func ArtistApiHandler(w http.ResponseWriter, r *http.Request) {
	var artist media.Artist;
	ResponseSingleObject(w, r, &artist)
}
