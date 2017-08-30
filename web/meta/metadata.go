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

package meta

// Metadata is a struct for modeling HTML metadata. (<meta ... />)
type Metadata struct {
	Name      string
	Content   string
	Charset   string
	HttpEquiv string
}

var metadata = []Metadata{}

func init() {
	// add some defaut metadata tags
	AddPageMetadata(Metadata{Charset: "UTF-8"})
	AddPageMetadata(Metadata{
		Name:    "viewport",
		Content: "width=device-width, initial-scale=1",
	})
	AddPageMetadata(Metadata{
		Name:    "theme-color",
		Content: "#337180",
	})
}

// AddPageMetadata adds a new metadata object to the list of metadata objects, which are added to every served HTML
// page
func AddPageMetadata(data Metadata) {
	metadata = append(metadata, data)
}

// GetPageMetadata returns all metadata to add to a HTML page
func GetPageMetadata() []Metadata {
	return metadata
}
