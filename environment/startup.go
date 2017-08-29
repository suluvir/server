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

import (
	"fmt"
	"github.com/suluvir/server/util"
)

type StartupCallback func()

// constants for the execution times
const (
	LOAD_CONFIGURATION = iota
	INITIALIZE_LOGGER  = iota
	LOGGER_INITIALIZED = iota
	CONNECT_DATABASE   = iota
	DATABASE_CONNECTED = iota
	INITIALIZE_ROUTER  = iota
	ROUTER_INITIALIZED = iota
	START_SERVICES     = iota
)

var order = []uint{
	LOAD_CONFIGURATION,
	INITIALIZE_LOGGER,
	LOGGER_INITIALIZED,
	CONNECT_DATABASE,
	DATABASE_CONNECTED,
	INITIALIZE_ROUTER,
	ROUTER_INITIALIZED,
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
	fmt.Printf("startup\n")
	startupCalled = true
	for _, o := range order {
		fmt.Printf("order: %d\n", o)
		cbs := callbacks[o]
		for _, cb := range cbs {
			fmt.Printf("callback: %s\n", util.GetReflectionName(cb))
			cb()
		}
	}
}
