import React from 'react';

import PlayButton from '../components/player/PlayButton';

export function artistNameJoin(artist_names) {
    return artist_names.join(', ');
}

export function playButton(songIdLink) {
    return <PlayButton songId={songIdLink} />;
}