import Immutable from 'immutable';

export const MY_SONGS = new Immutable.List();
export const MY_ARTISTS = new Immutable.List();
export const MY_ALBUMS = new Immutable.List();
export const MY_PLAYLISTS = new Immutable.List();
export const PLAY = Immutable.fromJS({
    list: [],
    current: 0,
    volume: 1.0
});
export const PLAYLIST_OF_SONG = new Immutable.Map();
export const USER = new Immutable.Map();

export const ERRORS = new Immutable.List();

export const UPLOAD = new Immutable.fromJS({
    pending: new Immutable.List(),
    uploaded: new Immutable.List()
});
