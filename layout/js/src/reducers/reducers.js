import Immutable from 'immutable';

import * as defaultStates from './defaultStates';
import * as actionNames from '../actions/actionNames';

export function mySongs(state = defaultStates.MY_SONGS, action) {
    switch (action.type) {
        case actionNames.SET_MY_SONGS:
            return action.payload;
        default:
            return state;
    }
}

export function myArtists(state = defaultStates.MY_ARTISTS, action) {
    switch (action.type) {
        case actionNames.SET_MY_ARTISTS:
            return action.payload;
        default:
            return state;
    }
}

export function myAlbums(state = defaultStates.MY_ALBUMS, action) {
    switch (action.type) {
        case actionNames.SET_MY_ALBUMS:
            return action.payload;
        default:
            return state;
    }
}

export function myPlaylists(state = defaultStates.MY_PLAYLISTS, action) {
    switch (action.type) {
        case actionNames.SET_MY_PLAYLISTS:
            return action.payload;
        default:
            return state;
    }
}

export function play(state = defaultStates.PLAY, action) {
    switch (action.type) {
        case actionNames.PLAY_SONG:
            return state.set('list', Immutable.List.of(action.payload)).set('current', 0);
        case actionNames.ADD_TO_PLAY_QUERE:
            return state.set('list', state.get('list').push(action.payload));
        case actionNames.SET_PLAY_QUEUE:
            return state.set('list', action.payload).set('current', 0);
        case actionNames.NEXT_SONG:
            return state.set('current', state.get('current') + 1);
        case actionNames.PREVIOUS_SONG:
            return state.set('current', state.get('current') - 1);
        case actionNames.SET_VOLUME:
            return state.set('volume', action.payload);
        default:
            return state;
    }
}

export function playlistsOfSong(state = defaultStates.PLAYLIST_OF_SONG, action) {
    switch (action.type) {
        case actionNames.SET_PLAYLISTS_FOR_SONG:
            return state.set(action.payload.song.get('@id'), action.payload.playlists);
        default:
            return state;
    }
}
