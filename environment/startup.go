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

package environment

type StartupCallback func()

// constants for the execution times
const (
	LOAD_CONFIGURATION   = iota
	CONFIGURATION_LOADED = iota
	INITIALIZE_LOGGER    = iota
	INITIALIZE_ROUTES    = iota
	START_SERVICES       = iota
)

var order = []uint{
	LOAD_CONFIGURATION,
	CONFIGURATION_LOADED,
	INITIALIZE_LOGGER,
	INITIALIZE_ROUTES,
	START_SERVICES,
}

var callbacks = map[uint][]StartupCallback{}

var startupCalled = false

// RegisterCallback registers a callback which is meant to be executed at the given time. `executionTime` parameter
// must be one of the constants defined above. All callbaks are meant to be registered in ine packages `init` functions.
func RegisterCallback(callback StartupCallback, executionTime uint) {
	callbacks[executionTime] = append(callbacks[executionTime], callback)
}

// ExecuteStartup exectues all registered callbacks in a given order. This function is not allowed to be called
// twice!
func ExecuteStartup() {
	if startupCalled == true {
		panic("ExecuteStartup is not allowed to be called twice!")
	}
	startupCalled = true
	for _, o := range order {
		cbs := callbacks[o]
		for _, cb := range cbs {
			cb()
		}
	}
}
