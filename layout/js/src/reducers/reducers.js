import Immutable from 'immutable';

import * as defaultStates from './defaultStates';
import * as actionNames from '../actions/actionNames';

import * as notificationActionNames from '../actions/names/notifications';
import * as uploadErrorNames from '../actions/names/upload';

export function mySongs(state = defaultStates.MY_SONGS, action) {
    switch (action.type) {
        case actionNames.SET_MY_SONGS:
            return action.payload;
        case actionNames.ADD_TO_MY_SONGS:
            return state.push(Immutable.fromJS(action.payload.song));
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
            return state.set('list', Immutable.List.of(Immutable.fromJS(action.payload))).set('current', 0);
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

export function user(state = defaultStates.USER, action) {
    switch (action.type) {
        case actionNames.FETCH_USER:
            return action.payload;
        default:
            return state;
    }
}

let notificationIdCounter = 0;

export function notifications(state = defaultStates.NOTIFICATIONS, action) {
    switch (action.type) {
        case notificationActionNames.ADD_NOTIFICATION:
            notificationIdCounter++;
            return state.push(Immutable.fromJS(action.payload).set('id', notificationIdCounter));
        case notificationActionNames.CLOSE_NOTIFICATION:
            return state.filter(notification => notification.get('id') !== action.payload);
        default:
            return state;
    }
}

export function upload(state = defaultStates.UPLOAD, action) {
    switch (action.type) {
        case uploadErrorNames.ADD_TO_UPLOAD_PENDING:
            return state.set('pending', state.get('pending').push(Immutable.fromJS({
                'name': action.payload.file.name,
                'size': action.payload.file.size,
                'type': action.payload.file.type
            })));
        case uploadErrorNames.UPLOAD_DONE:
            return state.set('pending', state.get('pending').filter(p =>
                p.get('size') !== action.payload.song.get('size'))
            ).set('uploaded', state.get('uploaded').push(action.payload.song));
        default:
            return state;
    }
}

export function objectsById(state = defaultStates.OBJECTS_BY_ID, action) {
    switch (action.type) {
        case actionNames.ADD_OBJECT_BY_ID:
            return state.set(action.payload.id, action.payload.object);
        default:
            return state;
    }
}
