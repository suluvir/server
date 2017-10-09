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
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {Menu, MenuItem, IconButton} from 'react-mdl';
import {connect} from 'react-redux';

import PlaylistModal from '../../playlist/PlaylistModal';

import {addToPlayQuereById} from '../../../actions/thunkActions';

class SongMenuButton extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            showModal: false
        };
    }

    render() {
        const {showModal} = this.state;
        const {song, addToPlayQuereById} = this.props;
        const songId = song.get('@id');
        const id = `suluvir-song-menu-${songId}`
        return (
            <div>
                <PlaylistModal show={showModal} song={song} onCancel={() => this.setState({showModal: false})}/>

                <IconButton name="more_vert" id={id} />
                <Menu target={id} align="right" ripple>
                    <MenuItem onClick={() => addToPlayQuereById(songId)}>Add to play quere</MenuItem>
                    <MenuItem onClick={() => this.setState({showModal: true})}>Add to playlist</MenuItem>
                </Menu>
            </div>
        );
    }
}

SongMenuButton.propTypes = {
    addToPlayQuereById: PropTypes.func.isRequired,
    song: PropTypes.instanceOf(Immutable.Map).isRequired
}

export default connect(undefined, {addToPlayQuereById})(SongMenuButton);
