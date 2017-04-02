import React from 'react';
import Immutable from 'immutable';

import {artistNameJoin, playButton, songMenuButton, formatTime} from '../../utils/formatters';

require('./SongList.scss');

export default class SongList extends React.Component {
    render() {
        const tableRows = [];
        this.props.songs.forEach(song => {
            tableRows.push(<tr>
                <td className="mdl-data-table__cell--non-numeric">{playButton(song.get('@id'))}</td>
                <td className="mdl-data-table__cell--non-numeric">{song.get('title')}</td>
                <td className="mdl-data-table__cell--non-numeric">{artistNameJoin(song.get('artist_names'))}</td>
                <td className="mdl-data-table__cell--non-numeric">{formatTime(song.get('duration'))}</td>
                <td className="mdl-data-table__cell--non-numeric">{songMenuButton(song.get('@id'))}</td>
            </tr>);
        });

        return (
            <div className={"suluvir-song-list"}>
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--3dp">
                    <thead>
                        <th className="mdl-data-table__cell--non-numeric"></th>
                        <th className="mdl-data-table__cell--non-numeric">Title</th>
                        <th className="mdl-data-table__cell--non-numeric">Artists</th>
                        <th className="mdl-data-table__cell--non-numeric">Duration</th>
                        <th className="mdl-data-table__cell--non-numeric"></th>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

SongList.propTypes = {
    songs: React.PropTypes.instanceOf(Immutable.List).isRequired
};