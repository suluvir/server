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

package oauth

import (
	"fmt"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/web/dependencyLoader"
	"github.com/suluvir/server/web/meta"
	"net/http"
)

const google = "google"

type GoogleProvider struct {
}

func init() {
	provider := config.GetConfiguration().Oauth[google]
	if provider.Enabled {
		AddProvider(google, GoogleProvider{})
		dependencyLoader.AddExternalJavascript("https://apis.google.com/js/platform.js")
		meta.AddPageMetadata(meta.Metadata{
			Name:    "google-signin-client_id",
			Content: fmt.Sprintf("%s.apps.googleusercontent.com", provider.ClientID),
		})
	}
}

func (g GoogleProvider) HandlerFunc(w http.ResponseWriter, r *http.Request) {

}
