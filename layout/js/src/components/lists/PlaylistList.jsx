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

import Paper from 'material-ui/Paper';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';

import PlayCollectionButton from '../player/PlayCollectionButton';

require('./PlaylistList.scss');

export default class PlaylistList extends React.PureComponent {
    render() {
        const rows = [];
        this.props.playlists.forEach(playlist => {
            rows.push(
                <TableRow>
                    <TableCell><PlayCollectionButton collection={playlist} /></TableCell>
                    <TableCell>{playlist.get('name')}</TableCell>
                </TableRow>
            );
        });

        return (
            <div className="suluvir-playlist-list">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                        </TableHead>
                        <TableBody>
                            {rows}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

PlaylistList.propTypes = {
    playlists: PropTypes.instanceOf(Immutable.List).isRequired
}