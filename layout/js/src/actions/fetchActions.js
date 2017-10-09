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

import {getJson} from '../utils/fetch';
import * as names from './actionNames';
import {createAction} from './actions';

function addToUrlCache(url, response) {
    return createAction(names.ADD_TO_URL_CACHE, {url, response});
}

export function fetchObject(url) {
    return dispatch => {
        getJson(url).then(obj => {
            dispatch(addToUrlCache(url, Immutable.fromJS(obj)));
        })
    };
}
