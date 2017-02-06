package intnl

import (
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func MySongsHandler(w http.ResponseWriter, r *http.Request) {
	var mySongs []media.Song

	schema.GetDatabase().Find(&mySongs)
	httpHelpers.ServeJsonWithoutCache(w, mySongs)
}
