import Immutable from 'immutable';

export function dispatchLogger() {
    return next => action => {
        console.log('dispatching', action);  // eslint-disable-line
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