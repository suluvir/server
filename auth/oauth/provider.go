// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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

package oauth

import (
	"errors"
	"fmt"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/suluvir/server/web/setup"
	"go.uber.org/zap"
	"net/http"
)

var providers = map[string]*Provider{}

type Provider interface {
	HandlerFunc(w http.ResponseWriter, r *http.Request)
}

func init() {
	setup.AddCallBack(addProvidersToSetup)
}

// AddProvider adds an oauth provider for logging in with services like google/facebook and twitter.
func AddProvider(urlPath string, provider Provider) error {
	if providers[urlPath] != nil {
		logging.GetLogger().Warn("skip adding oauth provider because some other is already present for this"+
			"url path", zap.String("urlPath", urlPath))
		return errors.New("provider already present for this key")
	}
	providers[urlPath] = &provider

	applyProviderRoute(urlPath, provider)

	return nil
}

func applyProviderRoute(urlPath string, provider Provider) {
	r := web.GetRouter()
	s := r.Subrouter("/api/oauth")

	s.HandleFunc(fmt.Sprintf("/%s", urlPath), provider.HandlerFunc).Methods(
		httpHelpers.POST).Name(getProviderUrlName(urlPath))
}

func getProviderUrlName(urlPath string) string {
	return fmt.Sprintf("oauth_provider_route_name_%s", urlPath)
}

func addProvidersToSetup(r *http.Request) (string, interface{}) {
	var setupProviders = map[string]map[string]interface{}{}

	for urlPath := range providers {
		url, _ := web.GetRouter().GetRoute(getProviderUrlName(urlPath)).URLPath()
		setupProviders[urlPath] = map[string]interface{}{
			"url": url.String(),
		}
	}

	return "oauth_providers", setupProviders
}
