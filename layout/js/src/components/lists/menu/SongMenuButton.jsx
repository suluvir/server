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