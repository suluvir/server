import React from 'react';
import Immutable from 'immutable';

import {artistNameJoin} from '../../utils/formatters';

require('./SongInfo.scss');

export default class SongInfo extends React.PureComponent {
    render() {
        const {song} = this.props;

        return (
            <div className="suluvir-songinfo">
                <div className="suluvir-songinfo__cover">
                    <img src={song.get('@cover')} alt="Cover"/>
                </div>
                <div className="suluvir-songinfo__meta">
                    <div className="suluvir-songinfo__title">
                        {song.get('title')}
                    </div>
                    <div className="suluvir-songinfo__artist">
                        {[artistNameJoin(song.get('artist_names'))]}
                    </div>
                </div>
            </div>
        );
    }
}

SongInfo.propTypes = {
    song: React.PropTypes.instanceOf(Immutable.Map).isRequired
}