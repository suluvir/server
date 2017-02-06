import * as Immutable from 'immutable';

import Action from '../actions/action';
import {Song} from './states'

import * as defaultStates from './defaultStates';
import * as actionName from '../actions/actionNames';

export function play(state: Immutable.List<Song> = defaultStates.PLAY, action: Action<Song>): Immutable.List<Song> {
    switch (action.type) {
        case actionName.PLAY_SONG:
            return Immutable.List.of<Song>(action.payload);
        default:
            return state;
    }
}
