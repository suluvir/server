import * as actionNames from './actionNames';

function createAction(type, payload) {
    return {
        type,
        payload
    }
}

export function setMySongs(mySongs) {
    return createAction(actionNames.SET_MY_SONGS, mySongs);
}

export function playSong(song) {
    return createAction(actionNames.PLAY_SONG, song);
}