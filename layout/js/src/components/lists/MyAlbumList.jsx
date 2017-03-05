import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {fetchMyAlbums} from '../../actions/thunkActions';

import AlbumList from './AlbumList';
import Loading from '../util/Loading';

class MyAlbumList extends React.Component {
    render() {
        const {albums, fetchMyAlbums} = this.props;

        if (albums.size === 0) {
            fetchMyAlbums();
            return <Loading />;
        }

        return <AlbumList albums={albums} />;
    }
}

MyAlbumList.propTypes = {
    albums: React.PropTypes.instanceOf(Immutable.List).isRequired,
    fetchMyAlbums: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        albums: state.myAlbums
    }
}

export default connect(mapStateToProps, {fetchMyAlbums})(MyAlbumList);