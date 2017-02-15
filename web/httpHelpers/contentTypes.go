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

package httpHelpers

import "errors"

const (
	HTML      = "text/html; charset=uft-8"
	JSON      = "application/json; charset=uft-8"
	CSS       = "text/css; charset=utf-8"
	JS        = "application/javascript; charset=uft-8"
	SOURCEMAP = JSON
	MP3       = "audio/mpeg"
)

var contentTypeMapping = map[string]string{
	"mp3": MP3,
}

func GetContentType(fileType string) (string, error) {
	if contentType, ok := contentTypeMapping[fileType]; ok {
		return contentType, nil
	}
	return "", errors.New("could not find content type")
}
