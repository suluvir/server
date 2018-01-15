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

import Paper from 'material-ui/Paper';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

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
                <TableCell>{playButton(song.get('@id'))}</TableCell>
                <TableCell>{song.get('title')}</TableCell>
                <TableCell>
                    <Link to={song.get('ui_album_link')}>{song.get('album_name')}</Link>
                </TableCell>
                <TableCell>{this.renderArtistLinks(song)}</TableCell>
                <TableCell>{formatTime(song.get('duration'))}</TableCell>
                <TableCell><SongMenuButton song={song}/></TableCell>
            </tr>);
        });

        return (
            <div className={"suluvir-song-list"}>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell></TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Album</TableCell>
                            <TableCell>Artists</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell></TableCell>
                        </TableHead>
                        <TableBody>
                            {tableRows}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

SongList.propTypes = {
    songs: PropTypes.instanceOf(Immutable.List).isRequired
};