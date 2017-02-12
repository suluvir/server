export function dispatchLogger() {
    return next => action => {
        console.log('dispatching', action);  // eslint-disable-line
        return next(action);
    }
}