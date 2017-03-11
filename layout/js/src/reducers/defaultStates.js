import Immutable from 'immutable';

export const MY_SONGS = new Immutable.List();
export const MY_ARTISTS = new Immutable.List();
export const MY_ALBUMS = new Immutable.List();
export const PLAY = Immutable.fromJS({
    list: [],
    current: 0,
    volume: 1.0
});
