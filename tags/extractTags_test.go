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

package tags

import (
	"github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/test"
	"testing"
)

var someUser = &auth.User{
	Username: "test",
}

func TestMain(m *testing.M) {
	test.BootstrapTests(m)
}

func TestGetAlbumByName(t *testing.T) {
	albumName := "some random album name"
	a := getAlbumByName(albumName, someUser)

	if a.Name != albumName {
		t.Error("expected album name to be "+albumName+", but instead got", a.Name)
	}
}

func TestGetArtistsByNamesSingleName(t *testing.T) {
	artistNames := "test"
	artists := getArtistsByNames(artistNames, someUser)

	if len(artists) != 1 {
		t.Error("extracted artists should have length 1, but have", len(artists))
	}
	if artists[0].Name != "test" {
		t.Error("expected artist name to be 'test', but it was", artists[0].Name)
	}
}

func TestGetArtistByNamesCommaSeparatedWithWhiteSpace(t *testing.T) {
	artistNames := "a,     b   , c"
	artists := getArtistsByNames(artistNames, someUser)

	if len(artists) != 3 {
		t.Error("extracted artists should have length 3, but have", len(artists))
	}
	if artists[0].Name != "a" || artists[1].Name != "b" || artists[2].Name != "c" {
		t.Error("names should be a, b and c, but are", artists)
	}
}

func TestGetArtistByNamesFeatSeparator(t *testing.T) {
	artistNames := "a feat.b"
	artists := getArtistsByNames(artistNames, someUser)

	if len(artists) != 2 {
		t.Error("extracted artists should have length 2, but have", len(artists))
	}

	if artists[0].Name != "a" || artists[1].Name != "b" {
		t.Error("names should be a and b but are", artists)
	}
}

func TestGetArtistByNamesFtSeparator(t *testing.T) {
	artistNames := "a ft.b"
	artists := getArtistsByNames(artistNames, someUser)

	if len(artists) != 2 {
		t.Error("extracted artists should have length 2, but have", len(artists))
	}

	if artists[0].Name != "a" || artists[1].Name != "b" {
		t.Error("names should be a and b but are", artists)
	}
}
