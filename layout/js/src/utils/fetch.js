function internalFetch(url, method='GET', init={}) {
    const commonInit = {
        method,
        credentials: 'include'
    }
    const mergedInit = Object.assign({}, commonInit, init);

    return new Promise((resolve, reject) => {
        fetch(url, mergedInit).then(response => {
            if (response.ok) {
                resolve(response);
            } else {
                reject(response);
            }
        }).catch(reject);
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
