import Immutable from 'immutable';

import {createAction} from './actions';

import * as uploadActionNames from './names/upload';

export function addToUploadPending(file) {
    return createAction(uploadActionNames.ADD_TO_UPLOAD_PENDING, {file});
}

export function uploadDone(song) {
    return createAction(uploadActionNames.UPLOAD_DONE, {song: Immutable.fromJS(song)});
}
