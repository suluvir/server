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
import Immutale from 'immutable';
import {connect} from 'react-redux';

import PlaylistList from './PlaylistList';
import Loading from '../util/Loading';

import {fetchMyPlaylists} from '../../actions/thunkActions';
import {setWindowTitle} from '../../utils/helpers';

class MyPlaylistList extends React.PureComponent {
    componentWillMount() {
        const {fetchMyPlaylists} = this.props;
        fetchMyPlaylists();
        setWindowTitle('My playlists');
    }

    render() {
        const {playlists} = this.props;

        if (playlists === null) {
            return <Loading />;
        }

        return <PlaylistList playlists={playlists} />;
    }
}

MyPlaylistList.propTypes = {
    fetchMyPlaylists: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.instanceOf(Immutale.List).isRequired
}

function mapStateToProps(state) {
    return {
        playlists: state.myPlaylists
    }
}

export default connect(mapStateToProps, {fetchMyPlaylists})(MyPlaylistList);