import {Play} from '../reducers/states';
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
 * Clean list of songs to play and use the given one as the only one to play-
 *
 * @param play object to play
 * @returns {Action<Play>}
 */
export function playSong(play: Play): Action<Play> {
    return createAction(actionNames.PLAY_SONG, play);
}
