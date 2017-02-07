import * as defaultStates from './defaultStates';
import * as actionNames from '../actions/actionNames';

export function mySongs(state = defaultStates.MY_SONGS, action) {
    switch (action.type) {
        case actionNames.SET_MY_SONGS:
            return action.payload;
        default:
            return state;
    }
}