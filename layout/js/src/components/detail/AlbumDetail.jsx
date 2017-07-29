import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {fetchObject} from '../../actions/fetchActions';
import {setWindowTitle} from '../../utils/helpers';

import SongList from '../lists/SongList';
import DetailHeader from './DetailHeader';

class AlbumDetail extends React.PureComponent {
    getApiLink() {
        const {params} = this.props;
        return `/api/v1/album/${params.albumId}`;
    }

    render() {
        const {album, fetchObject, songs} = this.props;

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
                />
                <SongList songs={songs}/>
            </div>
        );
    }
}

AlbumDetail.propTypes = {
    album: React.PropTypes.instanceOf(Immutable.Map),
    fetchObject: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
    songs: React.PropTypes.instanceOf(Immutable.List)
};

function mapStateToProps(state, ownProps) {
    const id = `/api/v1/album/${ownProps.params.albumId}`
    const album = state.urlCache.get(id);
    return {
        album,
        songs: album !== undefined ? state.urlCache.get(album.get('@songs')) : undefined
    }
}

export default connect(mapStateToProps, {fetchObject})(AlbumDetail);