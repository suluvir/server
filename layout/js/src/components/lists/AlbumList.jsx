import React from 'react';
import Immutable from 'immutable';

import PlayCollectionButton from '../player/PlayCollectionButton';

require('./AlbumList.scss');

export default class AlbumList extends React.Component {
    render() {
        const rows = [];
        this.props.albums.forEach(album => {
            rows.push(
                <tr>
                    <td className="mdl-data-table__cell--non-numeric"><PlayCollectionButton collection={album} /></td>
                    <td className="mdl-data-table__cell--non-numeric">{album.get('name')}</td>
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

AlbumList.propTypes = {
    albums: React.PropTypes.instanceOf(Immutable.List).isRequired
};