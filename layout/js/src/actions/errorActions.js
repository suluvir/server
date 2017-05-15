import * as actions from './names/error';

import {createAction} from './actions';

/**
 * Adds a new error to the list of dislayed errors.
 * 
 * @param {object} error the error, containing {details, message, status}
 */
export function addError(error) {
    return createAction(actions.ADD_ERROR, error);
}