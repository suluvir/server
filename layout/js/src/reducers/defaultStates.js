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

export const URL_CACHE = new Immutable.Map();

export const NOTIFICATIONS = new Immutable.List();

export const UPLOAD = new Immutable.fromJS({
    pending: new Immutable.List(),
    uploaded: new Immutable.List()
});
