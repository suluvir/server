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
    const node = document.getElementsByTagName('title');
    if (node.length != 1) {
        Console.error('multiple title tags present on page');
        return;
    }

    if (title !== undefined) {
        const newTitle = `${title} - Suluvir`
        node[0].innerText = newTitle;
    } else {
        node[0].innerText = 'Suluvir';
    }
}
