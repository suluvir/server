package v1

import (
	"github.com/suluvir/server/schema/media"
	"net/http"
)

func SongApiHandler(w http.ResponseWriter, r *http.Request) {
	var song media.Song
	ResponseSingleObject(w, r, &song)
}
