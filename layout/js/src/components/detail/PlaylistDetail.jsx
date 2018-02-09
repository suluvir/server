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
import {connect} from 'react-redux';

import {fetchObject} from '../../actions/fetchActions';

import PlaylistDetailHeader from './PlaylistDetailHeader';

import SongList from '../lists/SongList';
import { setWindowTitle } from '../../utils/helpers';

function getApiLink(id) {
    return `/api/v1/playlist/${id}`;
}

class PlaylistDetail extends React.PureComponent {
    getApiLink() {
        const {params} = this.props;
        return getApiLink(params.playlistId);
    }

    render() {
        const {playlist, songs, fetchObject} = this.props;

        if (playlist === undefined) {
            fetchObject(this.getApiLink());
            return <div/>;
        }

        if (songs === undefined) {
            fetchObject(playlist.get('@songs'));
            return <div/>;
        }

        setWindowTitle(playlist.get('name'));

        return (<div className="suluvir-playlist-details">
            <div className="suluvir-playlist-details__header">
                <PlaylistDetailHeader playlist={playlist} songs={songs} />
            </div>
            <div className="suluvir-playlist-details__songs">
                <SongList songs={songs}/>
            </div>
        </div>);
    }
}

PlaylistDetail.propTypes = {
    fetchObject: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    playlist: PropTypes.instanceOf(Immutable.Map),
    songs: PropTypes.instanceOf(Immutable.Map),
};

function mapStateToProps(state, ownProps) {
    const playlistUrl = getApiLink(ownProps.match.params.playlistId);
    const playlist = state.urlCache.get(playlistUrl);
    const songs = playlist !== undefined ? state.urlCache.get(playlist.get('@songs')) : undefined;
    return {
        playlist,
        songs,
        params: ownProps.match ? ownProps.match.params : undefined
    }
}

export default connect(mapStateToProps, {fetchObject})(PlaylistDetail);
