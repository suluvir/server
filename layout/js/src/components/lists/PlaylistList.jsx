import React from 'react';
import Immutable from 'immutable';

import PlayPlaylistButton from '../player/PlayPlaylistButton';

require('./PlaylistList.scss');

export default class PlaylistList extends React.PureComponent {
    render() {
        const rows = [];
        this.props.playlists.forEach(playlist => {
            rows.push(
                <tr>
                    <td className="mdl-data-table__cell--non-numeric"><PlayPlaylistButton playlist={playlist} /></td>
                    <td className="mdl-data-table__cell--non-numeric">{playlist.get('name')}</td>
                </tr>
            );
        });

        return (
            <div className="suluvir-playlist-list">
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

PlaylistList.propTypes = {
    playlists: React.PropTypes.instanceOf(Immutable.List).isRequired
}