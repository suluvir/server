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

package auth

import (
	"github.com/suluvir/server/test"
	"testing"
)

func TestMain(m *testing.M) {
	test.BootstrapTests(m)
}

func TestNotAllowed(t *testing.T) {
	c := NewUrlWhitelistCheck("/")
	if c.Check() {
		t.Error("url '/' should not match")
	}
}

func TestAllowed(t *testing.T) {
	c := NewUrlWhitelistCheck("/appstatic/dksjfhgskdjhfg")
	if !c.Check() {
		t.Error("url under '/appstatic/' should be allowed")
	}
}
