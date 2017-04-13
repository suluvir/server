import Immutable from 'immutable';

export const MY_SONGS = null;
export const MY_ARTISTS = null;
export const MY_ALBUMS = null;
export const MY_PLAYLISTS = null;
export const PLAY = Immutable.fromJS({
    list: [],
    current: 0,
    volume: 1.0
});
export const PLAYLIST_OF_SONG = new Immutable.Map();
