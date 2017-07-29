import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {fetchMyAlbums} from '../../actions/thunkActions';
import {setWindowTitle} from '../../utils/helpers';

import AlbumList from './AlbumList';
import Loading from '../util/Loading';

class MyAlbumList extends React.Component {
    componentWillMount() {
        const {fetchMyAlbums} = this.props;
        fetchMyAlbums();
        setWindowTitle('My albums');
    }

    render() {
        const {albums} = this.props;

        if (albums === null) {
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