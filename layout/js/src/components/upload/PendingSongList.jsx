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

import Immutable from 'immutable';
import React from 'react';

import {formatBytes} from '../../utils/formatters';

require('./PendingSongList.scss');

export default class PendingSongList extends React.PureComponent {
    render() {
        const rows = [];

        this.props.pending.forEach(p => {
            rows.push(
                <tr>
                    <td className="mdl-data-table__cell--non-numeric">{p.get('name')}</td>
                    <td className="mdl-data-table__cell--non-numeric">{formatBytes(p.get('size'))}</td>
                </tr>
            );
        });

        return (
            <div className="suluvir-pending-songs">
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--3dp">
                    <thead>
                        <th className="mdl-data-table__cell--non-numeric">File Name</th>
                        <th className="mdl-data-table__cell--non-numeric">Size</th>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

PendingSongList.propTypes = {
    pending: React.PropTypes.instanceOf(Immutable.List).isRequired
};