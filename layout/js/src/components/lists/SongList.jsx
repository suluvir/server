import React from 'react';
import Immutable from 'immutable';
import {Link} from 'react-router';

import {playButton, songMenuButton, formatTime} from '../../utils/formatters';

require('./SongList.scss');

export default class SongList extends React.Component {
    renderArtistLinks(song) {
        return song.get('artist_names').map(name => {
            return (
                <Link to={song.getIn(['ui_artist_links', name])}>
                    {name}
                </Link>
            );
        });
    }

    render() {
        const tableRows = [];
        this.props.songs.forEach(song => {
            tableRows.push(<tr>
                <td className="mdl-data-table__cell--non-numeric">{playButton(song.get('@id'))}</td>
                <td className="mdl-data-table__cell--non-numeric">{song.get('title')}</td>
                <td className="mdl-data-table__cell--non-numeric">
                    <Link to={song.get('ui_album_link')}>{song.get('album_name')}</Link>    
                </td> 
                <td className="mdl-data-table__cell--non-numeric">{this.renderArtistLinks(song)}</td>
                <td className="mdl-data-table__cell--non-numeric">{formatTime(song.get('duration'))}</td>
                <td className="mdl-data-table__cell--non-numeric">{songMenuButton(song)}</td>
            </tr>);
        });

        return (
            <div className={"suluvir-song-list"}>
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--3dp">
                    <thead>
                        <th className="mdl-data-table__cell--non-numeric"></th>
                        <th className="mdl-data-table__cell--non-numeric">Title</th>
                        <th className="mdl-data-table__cell--non-numeric">Album</th>
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