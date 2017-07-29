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
