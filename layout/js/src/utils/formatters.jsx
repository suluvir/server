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

import React from 'react';

import PlaySongButton from '../components/player/PlaySongButton';
import SongMenuButton from '../components/lists/menu/SongMenuButton';

const SECONDS_PER_MINUTE = 60;

export function artistNameJoin(artist_names) {
    return artist_names.join(', ');
}

export function playButton(songIdLink) {
    return <PlaySongButton songId={songIdLink} />;
}

export function formatTime(duration) {
    if (isNaN(duration)) {
        return '00:00';
    }

    duration = parseInt(duration);

    const minutes = Math.floor(duration / SECONDS_PER_MINUTE);
    const seconds = duration % SECONDS_PER_MINUTE;

    const minutesStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : '' + seconds;
    return `${minutesStr}:${secondsStr}`;
}

export function formatBytes(bytes, decimals = 2) {
    // heavily inspired by https://stackoverflow.com/a/18650828
    if(bytes == 0) return '0 Bytes';
    var k = 1024,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

export function songMenuButton(song) {
    return <SongMenuButton song={song} />;
}
