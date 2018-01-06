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
import {Link} from 'react-router-dom';

import {playButton, formatTime} from '../../utils/formatters';
import SongMenuButton from './menu/SongMenuButton';

require('./SongList.scss');

export default class SongList extends React.Component {
    renderArtistLinks(song) {
        return song.get('artist_names').map(name => {
            return (
                <Link to={song.getIn(['ui_artist_links', name])} key={song.get('@id')}>
                    {name}
                </Link>
            );
        });
    }

    render() {
        const tableRows = [];
        this.props.songs.forEach(song => {
            tableRows.push(<tr>
                <td className="mdl-data-table__cell--non-numeric">{playButton(song.get('@id'))}</td>
                <td className="mdl-data-table__cell--non-numeric">{song.get('title')}</td>
                <td className="mdl-data-table__cell--non-numeric">
                    <Link to={song.get('ui_album_link')}>{song.get('album_name')}</Link>
                </td>
                <td className="mdl-data-table__cell--non-numeric">{this.renderArtistLinks(song)}</td>
                <td className="mdl-data-table__cell--non-numeric">{formatTime(song.get('duration'))}</td>
                <td className="mdl-data-table__cell--non-numeric"><SongMenuButton song={song}/></td>
            </tr>);
        });

        return (
            <div className={"suluvir-song-list"}>
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--3dp">
                    <thead>
                        <th className="mdl-data-table__cell--non-numeric"></th>
                        <th className="mdl-data-table__cell--non-numeric">Title</th>
                        <th className="mdl-data-table__cell--non-numeric">Album</th>
                        <th className="mdl-data-table__cell--non-numeric">Artists</th>
                        <th className="mdl-data-table__cell--non-numeric">Duration</th>
                        <th className="mdl-data-table__cell--non-numeric"></th>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

SongList.propTypes = {
    songs: PropTypes.instanceOf(Immutable.List).isRequired
};