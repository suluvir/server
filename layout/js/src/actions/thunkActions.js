import Immutable from 'immutable';

import * as actions from './actions'
import {getJson} from '../utils/fetch';

export function fetchMySongs() {
    return dispatch => {
        getJson('/api/internal/my/songs').then(mySongs => {
            dispatch(actions.setMySongs(Immutable.fromJS(mySongs)));
        })
    }
}

export function playSongById(songId) {
    return (dispatch, getState) => {
        getState().mySongs.forEach(song => {
            if (song.get('@id') === songId) {
                dispatch(actions.playSong(song));
                return;
            }
        });
    }
}
