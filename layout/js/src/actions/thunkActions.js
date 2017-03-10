import Immutable from 'immutable';

import * as actions from './actions'
import {getJson} from '../utils/fetch';

function getSongById(songs, id) {
    return songs.find(song => {
        return song.get('@id') === id
    });
}

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
        const song = getSongById(getState().mySongs, songId);
        dispatch(actions.playSong(song));
    }
}

export function addToPlayQuereById(songId) {
    return (dispatch, getState) => {
        const state = getState();
        const song = getSongById(state.mySongs, songId);
        if (state.play.get('list').last() === song) {
            return;
        }
        dispatch(actions.addToPlayQueue(song));
    }
}
