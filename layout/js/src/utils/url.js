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

export function getUrlParams() {
    try {
        const url = new URL(window.location.href);
        return url.searchParams;
    } catch (error) {
        // URL isn't supported in IE
        return undefined;
    }
}

export function getRedirectUrl() {
    const urlParams = getUrlParams();
    // urlParams might be undefined in ie/edge, so ignore it
    if (urlParams && urlParams.has('return_to')) {
        return unescape(urlParams.get('return_to'));
    }
    return '/';
}