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

package mail

import (
	"github.com/suluvir/server/environment"
	"path"
)

type Mail struct {
	sender       string
	receiver     []string
	templateName string
	templateData interface{}
}

// NewMail creates a new Mail. It currently only supports a single receiver. templateName has to be a valid
// file within the layout/html directory
func NewMail(sender, receiver, templateName string, templateData interface{}) Mail {
	templateName = path.Join(environment.GetBaseDirectory(), "layout", "html", templateName)
	return Mail{
		sender:       sender,
		receiver:     []string{receiver},
		templateName: templateName,
		templateData: templateData,
	}
}
