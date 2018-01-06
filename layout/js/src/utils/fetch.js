// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import {getStore} from './redux';
import {addNotification} from '../actions/notificationActions';

function _rejectAndAddNotification(response, reject) {
    response.json().then(result => {
        reject(result);
        result['type'] = 'error';
        getStore().dispatch(addNotification(result));
    })
}

function internalFetch(url, method='GET', init={}) {
    const commonInit = {
        method,
        credentials: 'include'
    };
    const mergedInit = Object.assign({}, commonInit, init);

    return new Promise((resolve, reject) => {
        fetch(url, mergedInit).then(response => {
            if (response.ok) {
                resolve(response);
            } else {
                _rejectAndAddNotification(response, reject);
            }
        }).catch(response => {
            _rejectAndAddNotification(response, reject);
        });
    })
}

/**
 * Fetches a given url and returns the value as json.
 *
 * @param {string} url url to fetch
 * @returns {Promise} a promise passing through the parsed json
 */
export function getJson (url) {
    return internalFetch(url).then(response => {
        return response.json();
    });
}

/**
 * Sends a post request to the given url containing the data given as request body
 *
 * @param {string} url url to fetch
 * @param {object} data data to send
 */
export function postJson(url, data = undefined) {
    if (data === undefined) {
        data = {};
    }
    const init = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return internalFetch(url, 'POST', init).then(response => {
        return response.json();
    });
}

/**
 * Sends a file as multipart/form-data.
 *
 * @param {string} url the url to send the post request to
 * @param {File} file the file
 * @param {string} fileKey name unter which the file gets set in the FormData object
 */
export function postFile(url, file, fileKey) {
    const formData = new FormData();
    formData.set(fileKey, file, file.name);

    const init = {
        body: formData
    };

    return internalFetch(url, 'POST', init).then(response => {
        return response.json();
    });
}
