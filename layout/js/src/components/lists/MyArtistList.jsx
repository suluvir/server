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
import PropTypes from 'prop-types';

import {fetchMyArtists} from '../../actions/thunkActions';
import {setWindowTitle} from '../../utils/helpers';

import ArtistList from './ArtistList';
import Loading from '../util/Loading';

class MyArtistList extends React.Component {
    componentWillMount() {
        const {fetchMyArtists} = this.props;
        fetchMyArtists();
        setWindowTitle('My artists');
    }

    render() {
        const {artists} = this.props;

        if (artists === null) {
            return <Loading />;
        }

        return <ArtistList artists={artists} />;
    }
}

MyArtistList.propTypes = {
    artists: PropTypes.instanceOf(Immutable.List).isRequired,
    fetchMyArtists: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        artists: state.myArtists
    }
}

export default connect(mapStateToProps, {fetchMyArtists})(MyArtistList);