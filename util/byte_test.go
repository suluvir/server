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

package util

import "testing"

func TestGetBytesValid(t *testing.T) {
	simple, _ := GetBytes("1")
	if simple != 1 {
		t.Error("expected 1, got", simple)
	}

	kilo, _ := GetBytes("1K")
	if kilo != 1024 {
		t.Error("expected 1024, got", kilo)
	}

	mega, _ := GetBytes("22M")
	if mega != 23068672 {
		t.Error("expected 23068672, got", mega)
	}
}

func TestGetBytesInvalid(t *testing.T) {
	_, err := GetBytes("random value")
	if err != nil {
		t.Error("expected error to be thrown, but wasn't")
	}
}
