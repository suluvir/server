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
import Immutable from 'immutable';

import {connect} from 'react-redux';

import {setWindowTitle} from '../../utils/helpers';

import {fetchNewContent} from '../../actions/thunkActions';

import Loading from '../util/Loading';
import Tile from './Tile';

require('./Overview.scss');

class Overview extends React.PureComponent {
    componentWillMount() {
        setWindowTitle(undefined);
        this.props.fetchNewContent();
    }

    render() {
        const {artists, albums} = this.props;

        if (artists === undefined || albums === undefined) {
            return <Loading/>;
        }

        return (
            <div>
                <h2>Your newest Artists</h2>
                <div className="suluvir-home-content-list">
                    {artists.map(a => <Tile collection={a} key={a}/>)}
                </div>

                <hr/>

                <h2>Your newest Albums</h2>
                <div className="suluvir-home-content-list">
                    {albums.map(a => <Tile collection={a} key={a}/>)}
                </div>
            </div>
        );
    }
}

Overview.propTypes = {
    fetchNewContent: PropTypes.func.isRequired,
    artists: PropTypes.instanceOf(Immutable.List),
    albums: PropTypes.instanceOf(Immutable.List),
};

function mapStateToProps(state) {
    return {
        artists: state.newContent.get('artists'),
        albums: state.newContent.get('albums'),
    }
}

export default connect(mapStateToProps, {fetchNewContent})(Overview);
