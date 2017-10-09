import Immutable from 'immutable';
import PropTypes from 'prop-types';
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
    pending: PropTypes.instanceOf(Immutable.List).isRequired
};