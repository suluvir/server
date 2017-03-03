import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {fetchMyArtists} from '../../actions/thunkActions';

import ArtistList from './ArtistList';

class MyArtistList extends React.Component {
    render() {
        const {artists, fetchMyArtists} = this.props;

        if (artists.size === 0) {
            fetchMyArtists();
            return <div />;
        }

        return <ArtistList artists={artists} />;
    }
}

MyArtistList.propTypes = {
    artists: React.PropTypes.instanceOf(Immutable.List).isRequired,
    fetchMyArtists: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        artists: state.myArtists
    }
}

export default connect(mapStateToProps, {fetchMyArtists})(MyArtistList);