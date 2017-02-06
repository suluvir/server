import {Song} from '../reducers/states';
import Action from './action';

import * as actionNames from './actionNames';

/**
 * @param type action type
 * @param payload action payload
 * @returns Action<any> created action
 */
function createAction(type: string, payload: any): Action<any> {
    return {
        type,
        payload
    }
}

/**
 * Clean list of songs to play and use the given one as the only one to play
 *
 * @param song song to play
 * @returns {Action<Song>}
 */
export function playSong(song: Song): Action<Song> {
    return createAction(actionNames.PLAY_SONG, song);
}
