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

package util

import (
	"runtime"
	"testing"
)

func TestExistsFile(t *testing.T) {
	if runtime.GOOS == "windows" {
		if !ExistsFile("C:\\Windows\\explorer.exe") {
			t.Error("failed to check that existing file exists")
		}

		if ExistsFile("C:\\Windows\\someveryrandomfilekfcsjhedgkfjhsedagkfajhsgfkjhdgkjhg.exe") {
			t.Error("failed to check that some nonexisting file exists")
		}
	} else {
		if !ExistsFile("/ets/hosts") {
			t.Error("failed to check that existing file exists")
		}

		if ExistsFile("/etc/kdsjhfcvsdkjhfcgsdkjhfvgkdjhfskajhfgcksdjhgc") {
			t.Error("failed to check that some nonexisting file exists")
		}
	}
}
