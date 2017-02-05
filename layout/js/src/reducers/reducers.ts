import * as Immutable from 'immutable';

import Action from '../actions/action';
import {Play} from './states'

import * as defaultStates from './defaultStates';
import * as actionName from '../actions/actionNames';

export function play(state: Immutable.List<Play> = defaultStates.PLAY, action: Action<Play>): Immutable.List<Play> {
    switch (action.type) {
        case actionName.PLAY_SONG:
            return Immutable.List.of<Play>(action.payload);
        default:
            return state;
    }
}
