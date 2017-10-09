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

import * as actionNames from './actionNames';

export function createAction(type, payload) {
    return {
        type,
        payload
    }
}

export function setMySongs(mySongs) {
    return createAction(actionNames.SET_MY_SONGS, mySongs);
}

export function addToMySongs(song) {
    return createAction(actionNames.ADD_TO_MY_SONGS, {song});
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
