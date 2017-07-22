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