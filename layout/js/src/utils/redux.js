import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers/reducers';
import {dispatchLogger} from './helpers';

let store = undefined;

export function getStore() {
    if (store === undefined) {
        store = createStore(
            combineReducers(reducers),
            applyMiddleware(dispatchLogger, thunk)
        );
    }

    return store;
}