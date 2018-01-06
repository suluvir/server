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
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {fetchObject} from '../../actions/fetchActions';
import {setWindowTitle} from '../../utils/helpers';

import SongList from '../lists/SongList';
import AlbumDetailHeader from './AlbumDetailHeader';

class AlbumDetail extends React.PureComponent {
    getApiLink() {
        const {albumLink, params} = this.props;
        return albumLink ? albumLink : `/api/v1/album/${params.albumId}`;
    }

    render() {
        const {album, fetchObject, songs, ...others} = this.props;

        if (album === undefined) {
            fetchObject(this.getApiLink());
            return <div/>
        }

        setWindowTitle(album.get('name'));

        if (songs === undefined) {
            fetchObject(album.get('@songs'));
            return <div/>;
        }

        return (
            <div className="suluvir-detail suluvir-album-detail">
                <AlbumDetailHeader
                    album={album}
                    songs={songs}
                    {...others}
                />
                <SongList songs={songs}/>
            </div>
        );
    }
}

AlbumDetail.propTypes = {
    album: PropTypes.instanceOf(Immutable.Map),
    albumLink: PropTypes.string,
    fetchObject: PropTypes.func.isRequired,
    params: PropTypes.object,
    songs: PropTypes.instanceOf(Immutable.List)
};

function mapStateToProps(state, ownProps) {
    const id = ownProps.albumLink ? ownProps.albumLink : `/api/v1/album/${ownProps.match.params.albumId}`;
    const album = state.urlCache.get(id);
    return {
        album,
        songs: album !== undefined ? state.urlCache.get(album.get('@songs')) : undefined,
        params: ownProps.match ? ownProps.match.params : undefined
    }
}

export default connect(mapStateToProps, {fetchObject})(AlbumDetail);