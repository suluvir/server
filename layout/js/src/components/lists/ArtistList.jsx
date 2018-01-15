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

import PlayCollectionButton from '../player/PlayCollectionButton';

require('./ArtistList.scss');

export default class ArtistList extends React.Component {
    render() {
        const rows = [];
        this.props.artists.forEach(artist => {
            rows.push(
                <TableRow>
                    <TableCell><PlayCollectionButton collection={artist} /></TableCell>
                    <TableCell><Link to={artist.get('@ui')}>{artist.get('name')}</Link></TableCell>
                </TableRow>
            );
        });

        return (
            <div className="suluvir-artist-list">
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

ArtistList.propTypes = {
    artists: PropTypes.instanceOf(Immutable.List).isRequired
};