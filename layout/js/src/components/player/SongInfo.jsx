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

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {artistNameJoin} from '../../utils/formatters';

require('./SongInfo.scss');

export default class SongInfo extends React.PureComponent {
    render() {
        const {song} = this.props;

        return (
            <div className="suluvir-songinfo">
                <div className="suluvir-songinfo__cover">
                    <img src={song.get('@cover')} alt="Cover"/>
                </div>
                <div className="suluvir-songinfo__meta">
                    <div className="suluvir-songinfo__title">
                        {song.get('title')}
                    </div>
                    <div className="suluvir-songinfo__artist">
                        {[artistNameJoin(song.get('artist_names'))]}
                    </div>
                </div>
            </div>
        );
    }
}

SongInfo.propTypes = {
    song: PropTypes.instanceOf(Immutable.Map).isRequired
}