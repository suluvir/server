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