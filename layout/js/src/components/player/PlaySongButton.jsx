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
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import PlayCircleFilledIcon from 'material-ui-icons/PlayCircleFilled';
import PlayCircleOutlineButton from 'material-ui-icons/PlayCircleOutline';

import {playSongById} from '../../actions/thunkActions';

class PlaySongButton extends React.PureComponent {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {playSongById, songId} = this.props;
        playSongById(songId);
    }

    render() {
        const {currentlyPlaying} = this.props;
        if (currentlyPlaying) {
            return (
                <IconButton>
                    <PlayCircleFilledIcon/>
                </IconButton>
            );
        }
        return (
            <IconButton onClick={this.onClick}>
                <PlayCircleOutlineButton/>
            </IconButton>
        );
    }
}

PlaySongButton.propTypes = {
    currentlyPlaying: PropTypes.bool.isRequired,
    playSongById: PropTypes.func.isRequired,
    songId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    const currentlyPlaying = state.play.get('list').get(state.play.get('current')) !== undefined &&
        state.play.get('list').get(state.play.get('current')).get('@id') === ownProps.songId;
    return {
        currentlyPlaying
    }
}

export default connect(mapStateToProps, {playSongById})(PlaySongButton);
