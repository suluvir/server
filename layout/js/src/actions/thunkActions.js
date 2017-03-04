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

export function fetchMyArtists() {
    return dispatch => {
        getJson('/api/internal/my/artists').then(myArtists => {
            dispatch(actions.setMyArtists(Immutable.fromJS(myArtists)));
        }) 
    }
}

export function fetchMyAlbums() {
    return dispatch => {
        getJson('/api/internal/my/albums').then(myALbums => {
            dispatch(actions.setMyAlbums(Immutable.fromJS(myALbums)));
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
