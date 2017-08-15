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