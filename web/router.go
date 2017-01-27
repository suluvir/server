package web

import (
	"github.com/gorilla/mux"
)

var router *mux.Router

func InitializeRouter() *mux.Router {
	if router != nil {
		return router
	}
	router = mux.NewRouter().Host("localhost:8080").Subrouter()
	return router
}

func GetRouter() *mux.Router {
	if router == nil {
		return InitializeRouter()
	}
	return router
}
