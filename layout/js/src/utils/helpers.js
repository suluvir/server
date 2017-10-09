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

import Immutable from 'immutable';

export function dispatchLogger() {
    return next => action => {
        Console.log('dispatching', action);
        return next(action);
    }
}

let setup = undefined;

export function getSetup() {
    if (setup === undefined) {
        setup = Immutable.fromJS(window.setup);
    }
    return setup;
}

export function isDebugMode() {
    return getSetup().get('development');
}

/**
 * This function calls the given function only if debug moide is enabled. It is a noop else.
 * 
 * @param {function} func 
 * @param {any} params 
 */
export function onlyInDebug(func, ...params) {
    if(isDebugMode()) {
        func(...params);
    }
}

export class Console {
    static log(...params) {
        onlyInDebug(console.log, ...params);  // eslint-disable-line
    }

    static warn(...params) {
        onlyInDebug(console.warn, ...params);  // eslint-disable-line
    }

    static error(...params) {
        onlyInDebug(console.error, ...params);  // eslint-disable-line
    }

    static table(...params) {
        onlyInDebug(console.table, ...params);  // eslint-disable-line
    }
}

/**
 * Sets the title of the application.
 * @param {string} title the new title. Set it to undefined to set the default title.
 */
export function setWindowTitle(title=undefined) {
    if (title !== undefined) {
        const newTitle = `${title} - Suluvir`
        document.title = newTitle;
    } else {
        document.title = 'Suluvir';
    }
}
