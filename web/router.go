// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package web

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"net/http"
)

var suluvirRouter *SuluvirRouter

const httpPort = 80
const httpsPort = 443

type SuluvirRouter struct {
	mux *mux.Router
}

func init() {
	environment.RegisterCallback(func() { initializeRouter() }, environment.INITIALIZE_ROUTER)
}

func (s *SuluvirRouter) HandleFunc(path string, f func(http.ResponseWriter, *http.Request)) *mux.Route {
	return s.mux.Handle(path, applyMiddleware(http.HandlerFunc(f)))
}

func (s *SuluvirRouter) Handler(path string, handler http.Handler) *mux.Route {
	return s.mux.PathPrefix(path).Handler(applyMiddleware(handler))
}

func (s *SuluvirRouter) GetRoute(name string) *mux.Route {
	return s.mux.Get(name)
}

func (s *SuluvirRouter) Subrouter(pathPrefix string) *SuluvirRouter {
	subrouter := &SuluvirRouter{
		mux: s.mux.PathPrefix(pathPrefix).Subrouter(),
	}
	return subrouter
}

// GetMuxRouterForTestingPurposes returns the underlying mus router to be used for testing purposes
func (s *SuluvirRouter) GetMuxRouterForTestingPurposes() *mux.Router {
	return s.mux
}

func getMuxRouter() *mux.Router {
	return suluvirRouter.mux
}

func initializeRouter() *mux.Router {
	router := mux.NewRouter().Host(getHostnameFromConfig()).Subrouter()
	suluvirRouter = &SuluvirRouter{
		mux: router,
	}
	return suluvirRouter.mux
}

func getHostnameFromConfig() string {
	c := config.GetConfiguration()
	return makeHostname(c.Web.Hostname, c.Web.Port)
}

func makeHostname(hostname string, port int) string {
	if port == httpPort || port == httpsPort {
		return hostname
	}
	return fmt.Sprintf("%s:%d", hostname, port)
}

func GetRouter() *SuluvirRouter {
	return suluvirRouter
}
