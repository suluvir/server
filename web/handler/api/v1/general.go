package v1

import (
	"github.com/gorilla/mux"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web/httpHelpers"
	"net/http"
)

func ResponseSingleObject(w http.ResponseWriter, r *http.Request, o interface{}) {
	vars := mux.Vars(r)
	schema.GetDatabase().First(o, "id = ?", vars["id"])

	httpHelpers.ServeJsonWithoutCache(w, o)
}
