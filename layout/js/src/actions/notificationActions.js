import * as actions from './names/notifications';

import {createAction} from './actions';

/**
 * Adds a new error to the list of dislayed errors.
 * 
 * @param {object} error the error, containing {details, message, status, type}
 */
export function addNotification(notification) {
    return createAction(actions.ADD_NOTIFICATION, notification);
}