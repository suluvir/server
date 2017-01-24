package httpHelpers

import (
	"net/http"
	"encoding/json"
)

func ServeJsonWithoutCache(w http.ResponseWriter, v interface{}) error {
	w.Header().Set(CONTENT_TYPE, JSON)
	w.Header().Set(CACHE_CONTROL, NO_CACHE)
	w.Header().Set(EXPIRES, "-1")
	return json.NewEncoder(w).Encode(v)
}
