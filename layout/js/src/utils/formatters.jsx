import React from 'react';

import PlayButton from '../components/player/PlayButton';
import PlayPlaylistButton from '../components/player/PlayPlaylistButton';
import SongMenuButton from '../components/lists/menu/SongMenuButton';

const SECONDS_PER_MINUTE = 60;

export function artistNameJoin(artist_names) {
    return artist_names.join(', ');
}

export function playButton(songIdLink) {
    return <PlayButton songId={songIdLink} />;
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

export function songMenuButton(song) {
    return <SongMenuButton song={song} />;
}

export function playlistPlayButton(playlist) {
    return <PlayPlaylistButton playlist={playlist} />;
}
