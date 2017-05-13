/**
 * Fetches a given url and returns the value as json.
 *
 * @param {string} url url to fetch
 * @returns {Promise} a promise passing through the parsed json
 */
export function getJson (url) {
    return fetch(url, {
        credentials: 'include'
    }).then(response => {
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
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    };
    return fetch(url, init).then(response => {
        return response.json();
    });
}
