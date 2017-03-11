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

export function setMyArtists(myArtists) {
    return createAction(actionNames.SET_MY_ARTISTS, myArtists);
}

export function setMyAlbums(myAlbums) {
    return createAction(actionNames.SET_MY_ALBUMS, myAlbums);
}

export function playSong(song) {
    return createAction(actionNames.PLAY_SONG, song);
}

export function nextSong() {
    return createAction(actionNames.NEXT_SONG);
}

export function previousSong() {
    return createAction(actionNames.PREVIOUS_SONG);
}

export function addToPlayQueue(song) {
    return createAction(actionNames.ADD_TO_PLAY_QUERE, song);
}

export function setVolume(volume) {
    return createAction(actionNames.SET_VOLUME, volume);
}