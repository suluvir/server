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


import {getStore} from '../../utils/redux';


export default class Player {
    constructor() {
        this.queue = [];
        this.songFinishedCallback = undefined;
        this.audioLoadedCallback = undefined;
        this.audio = undefined;
        this.currentSong = undefined;

        this.onEnd = this.onEnd.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    setSongFinishedCallback(callback) {
        this.songFinishedCallback = callback;
    }

    setAudioLoadedCallback(callback) {
        this.audioLoadedCallback = callback;
    }

    playSong(song) {
        if (song === this.currentSong) {
            // to prevent replay because of react rerender
            return;
        }
        this.cleanupPrevious();
        this.audio = new window.Howl({
            'src': [song.get('@stream')],
            'format': song.get('type'),

            'html5': true, // stream, not download the whole file first

            'onend': this.onEnd,
            'onload': this.onLoad,

            'volume': getStore().getState().play.get('volume'),
        });
        this.play();
        this.currentSong = song;
    }

    cleanupPrevious() {
        if (this.audio === undefined) {
            return;
        }

        this.audio.stop();
    }

    onLoad() {
        if (this.audioLoadedCallback !== undefined) {
            this.audioLoadedCallback();
        }
    }

    onEnd() {
        if (this.songFinishedCallback !== undefined) {
            this.songFinishedCallback();
        }
    }

    pause() {
        this.audio.pause();
    }

    play() {
        this.audio.play();
    }

    setVolume(value) {
        this.audio.volume(value);
    }

    getCurrentTime() {
        if (this.audio === undefined) {
            return 0;
        }
        return this.audio.seek();
    }
}

export const PLAYER = new Player();
