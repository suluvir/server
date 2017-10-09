// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
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
import Immutable from 'immutable';
import {Link} from 'react-router';

import PlayCollectionButton from '../player/PlayCollectionButton';

require('./ArtistList.scss');

export default class ArtistList extends React.Component {
    render() {
        const rows = [];
        this.props.artists.forEach(artist => {
            rows.push(
                <tr>
                    <td className="mdl-data-table__cell--non-numeric"><PlayCollectionButton collection={artist} /></td>
                    <td className="mdl-data-table__cell--non-numeric"><Link to={artist.get('@ui')}>{artist.get('name')}</Link></td>
                </tr>
            );
        });

        return (
            <div className="suluvir-artist-list">
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--3dp">
                    <thead>
                        <th className="mdl-data-table__cell--non-numeric"></th>
                        <th className="mdl-data-table__cell--non-numeric">Name</th>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

ArtistList.propTypes = {
    artists: React.PropTypes.instanceOf(Immutable.List).isRequired
};