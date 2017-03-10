import React from 'react';

import PlayButton from '../components/player/PlayButton';

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

    const minutes = Math.floor(duration / SECONDS_PER_MINUTE);
    const seconds = parseInt(duration % SECONDS_PER_MINUTE);

    const minutesStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : '' + seconds;
    return `${minutesStr}:${secondsStr}`;
}