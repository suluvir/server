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

export function setMyPlaylists(myPlaylists) {
    return createAction(actionNames.SET_MY_PLAYLISTS, myPlaylists);
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

export function setPlaylistsForSong(song, playlists) {
    return createAction(actionNames.SET_PLAYLISTS_FOR_SONG, {song, playlists});
}

export function setPlayQueue(songs) {
    return createAction(actionNames.SET_PLAY_QUEUE, songs);
}

export function setUser(user) {
    return createAction(actionNames.FETCH_USER, user);
}