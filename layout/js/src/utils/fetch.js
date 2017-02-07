/**
 * Fetches a given url and returns the value as json.
 * 
 * @param {string} url url to fetch
 */
export function getJson(url) {
    return fetch(url).then(response => {
        return response.json();
    })
}