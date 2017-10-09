import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {Link} from 'react-router-dom';

import PlayCollectionButton from '../player/PlayCollectionButton';

require('./AlbumList.scss');

export default class AlbumList extends React.Component {
    render() {
        const rows = [];
        this.props.albums.forEach(album => {
            rows.push(
                <tr>
                    <td className="mdl-data-table__cell--non-numeric"><PlayCollectionButton collection={album} /></td>
                    <td className="mdl-data-table__cell--non-numeric"><Link to={album.get('@ui')}>{album.get('name')}</Link></td>
                    <td className="mdl-data-table__cell--non-numeric"><Link to={album.get('ui_artist_link')}>{album.get('artist_name')}</Link></td>
                </tr>
            );
        });

        return (
            <div className="suluvir-artist-list">
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--3dp">
                    <thead>
                        <th className="mdl-data-table__cell--non-numeric"></th>
                        <th className="mdl-data-table__cell--non-numeric">Name</th>
                        <th className="mdl-data-table__cell--non-numeric">Artist</th>
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
    albums: PropTypes.instanceOf(Immutable.List).isRequired
};