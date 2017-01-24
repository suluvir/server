package v1

import (
	"net/http"
	"github.com/suluvir/server/schema/media"
)

func SongApiHandler(w http.ResponseWriter, r *http.Request) {
	var song media.Song;
	ResponseSingleObject(w, r, song)
}
