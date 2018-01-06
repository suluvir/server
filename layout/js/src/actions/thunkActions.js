// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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

import Immutable from 'immutable';

import * as actions from './actions'
import {getJson, postJson} from '../utils/fetch';

function getSongById(songs, id) {
    return songs.find(song => {
        return song.get('@id') === id
    });
}

export function fetchMySongs() {
    return dispatch => {
        return getJson('/api/internal/my/songs').then(mySongs => {
            dispatch(actions.setMySongs(Immutable.fromJS(mySongs)));
        })
    }
}

export function fetchMyArtists() {
    return dispatch => {
        return getJson('/api/internal/my/artists').then(myArtists => {
            dispatch(actions.setMyArtists(Immutable.fromJS(myArtists)));
        })
    }
}

export function fetchMyAlbums() {
    return dispatch => {
        return getJson('/api/internal/my/albums').then(myALbums => {
            dispatch(actions.setMyAlbums(Immutable.fromJS(myALbums)));
        })
    }
}

export function fetchMyPlaylists() {
    return dispatch => {
        return getJson('/api/internal/my/playlists').then(myPlaylists => {
            dispatch(actions.setMyPlaylists(Immutable.fromJS(myPlaylists)));
        })
    }
}

export function fetchPlaylistsOfSong(song) {
    return dispatch => {
        const songId = song.get('id');
        const url = `/api/internal/song/${songId}/playlists`;
        return getJson(url).then(playlists => {
            dispatch(actions.setPlaylistsForSong(song, Immutable.fromJS(playlists)));
        });
    }
}

export function playSongById(songId) {
    return (dispatch, getState) => {
        const song = getSongById(getState().mySongs, songId);
        if (song === undefined) {
            getJson(songId).then(s => {
                dispatch(actions.addToMySongs(s));
                dispatch(actions.playSong(s));
            })
        } else {
            dispatch(actions.playSong(song));
        }
    }
}

export function addToPlayQuereById(songId) {
    return (dispatch, getState) => {
        const state = getState();
        const song = getSongById(state.mySongs, songId);
        if (state.play.get('list') !== undefined && state.play.get('list').last() === song) {
            // make it not possible to add a song to the play quere twice
            return;
        }
        dispatch(actions.addToPlayQueue(song));
    }
}

export function addSongToPlaylist(song, playlist) {
    return dispatch => {
        const data = {
            song_id: song.get('id')
        };
        const url = playlist.get('@id') + '/song';
        return postJson(url, data).then(() => {
            dispatch(fetchMyPlaylists());
        })
    }
}

export function createPlaylist(name) {
    return dispatch => {
        return postJson('/api/v1/playlist', {name}).then(() => {
            dispatch(fetchMyPlaylists());
        });
    }
}

/**
 * Plays all songs of a given collection. The collection must be an
 * Immutable.Map and must contain an `@songs` field containing the
 * url for fetching all the collections songs.
 *
 * @param {Immutable.Map} collection the collection to play
 */
export function playCollection(collection) {
    return dispatch => {
        return getJson(collection.get('@songs')).then(songs => {
            dispatch(actions.setPlayQueue(Immutable.fromJS(songs)));
        });
    }
}

export function fetchUser() {
    return dispatch => {
        return getJson('/api/internal/my/user').then(user => {
            dispatch(actions.setUser(Immutable.fromJS(user)));
        });
    }
}
