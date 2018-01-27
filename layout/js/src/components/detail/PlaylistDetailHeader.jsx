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

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import DetailHeader from './DetailHeader';

export default class PlaylistDetailHeader extends React.PureComponent {
    getSongCount() {
        const {songs} = this.props;
        return songs.size === 1 ? 'One song' : `${songs.size} songs`;
    }

    render() {
        const {playlist, ...other} = this.props;
        return <DetailHeader
            collection={playlist}
            imgSrc={playlist.get('@cover')}
            title={playlist.get('name')}
            subTexts={[this.getSongCount()]}
            {...other}
        />;
    }
}

PlaylistDetailHeader.propTypes = {
    playlist: PropTypes.instanceOf(Immutable.Map).isRequired,
    songs: PropTypes.instanceOf(Immutable.List).isRequired,
};
