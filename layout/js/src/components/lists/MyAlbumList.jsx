// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
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