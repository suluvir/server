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

import IconButton from 'material-ui/IconButton';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';

import {playCollection} from '../../actions/thunkActions';

class PlayCollectionButton extends React.PureComponent {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {playCollection, collection} = this.props;
        playCollection(collection);
    }

    render() {
        return (
            <IconButton onClick={this.onClick}>
                <PlayCircleOutlineIcon/>
            </IconButton>
        );
    }
}

PlayCollectionButton.propTypes = {
    collection: PropTypes.instanceOf(Immutable.Map).isRequired,
    playCollection: PropTypes.func.isRequired
}

export default connect(undefined, {playCollection})(PlayCollectionButton);