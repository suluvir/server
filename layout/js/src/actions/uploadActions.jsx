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

import Immutable from 'immutable';

import {createAction} from './actions';

import * as uploadActionNames from './names/upload';

export function addToUploadPending(file) {
    return createAction(uploadActionNames.ADD_TO_UPLOAD_PENDING, {file});
}

export function uploadDone(song) {
    return createAction(uploadActionNames.UPLOAD_DONE, {song: Immutable.fromJS(song)});
}
