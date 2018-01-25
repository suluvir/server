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
import PropTypes from 'prop-types';
import React from 'react';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import {formatBytes} from '../../utils/formatters';

export default class PendingSongList extends React.PureComponent {
    render() {
        const rows = [];

        this.props.pending.forEach(p => {
            rows.push(
                <TableRow>
                    <TableCell>{p.get('name')}</TableCell>
                    <TableCell>{formatBytes(p.get('size'))}</TableCell>
                </TableRow>
            );
        });

        return (
            <Paper elevation={3}>
                <div className="suluvir-pending-songs">
                    <Table>
                        <TableHead>
                            <TableCell>File Name</TableCell>
                            <TableCell>Size</TableCell>
                        </TableHead>
                        <TableBody>
                            {rows}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        );
    }
}

PendingSongList.propTypes = {
    pending: PropTypes.instanceOf(Immutable.List).isRequired
};