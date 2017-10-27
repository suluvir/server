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

import Howler from 'howler';

export default class Player {
    constructor() {
        this.queue = [];
        this.songFinishedCallback = undefined;
        this.audio = undefined;
        this.currentSong === undefined;
    }

    setSongFinishedCallback(callback) {
        this.songFinishedCallback = callback;
    }

    playSong(song) {
        if (song === this.currentSong) {
            // to prevent replay because of react rerender
            return;
        }
        this.audio = new Howler({
            'src': [song.get('@stream')]
        });
        this.audio.play();
        this.currentSong = song;
    }
}

export const PLAYER = new Player();
