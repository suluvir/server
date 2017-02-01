package web

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/suluvir/server/config"
)

var router *mux.Router

const httpPort = 80
const httpsPort = 443

func InitializeRouter() *mux.Router {
	if router != nil {
		return router
	}
	router = mux.NewRouter().Host(getHostname()).Subrouter()
	return router
}

func getHostname() string {
	c := config.GetConfiguration()
	if c.Web.Port == httpPort || c.Web.Port == httpsPort {
		return c.Web.Hostname
	}
	return fmt.Sprintf("%s:%d", c.Web.Hostname, c.Web.Port)
}

func GetRouter() *mux.Router {
	if router == nil {
		return InitializeRouter()
	}
	return router
}
