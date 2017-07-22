import Immutable from 'immutable';

import {getJson} from '../utils/fetch';
import * as names from './actionNames';
import {createAction} from './actions';

function addObjectById(id, object) {
    return createAction(names.ADD_OBJECT_BY_ID, {id, object});
}

export function fetchObject(url) {
    return dispatch => {
        getJson(url).then(obj => {
            dispatch(addObjectById(url, Immutable.fromJS(obj)));
        })
    };
}