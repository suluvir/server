import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

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
    artists: React.PropTypes.instanceOf(Immutable.List).isRequired,
    fetchMyArtists: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        artists: state.myArtists
    }
}

export default connect(mapStateToProps, {fetchMyArtists})(MyArtistList);