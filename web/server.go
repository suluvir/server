package web

import (
	"fmt"
	"net/http"
)

func InitializeServer(port int) {
	router := CreateRouter()
	ApplyRoutes(router)
	http.ListenAndServe(fmt.Sprintf(":%d", port), router)
}
