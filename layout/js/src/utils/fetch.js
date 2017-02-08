/**
 * Fetches a given url and returns the value as json.
 *
 * @param {string} url url to fetch
 * @returns {Promise} a promise passing through the parsed json
 */
export function getJson (url) {
    return fetch(url).then(response => {
        return response.json();
    });
}
