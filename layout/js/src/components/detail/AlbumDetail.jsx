import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {fetchObject} from '../../actions/fetchActions';
import {setWindowTitle} from '../../utils/helpers';

import SongList from '../lists/SongList';
import DetailHeader from './DetailHeader';

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
                <DetailHeader
                    artists={[album.get('artist_name')]}
                    imgSrc={album.get('@cover')}
                    numberOfSongs={songs.size}
                    title={album.get('name')}
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