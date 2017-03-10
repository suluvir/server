import React from 'react';
import {Menu, MenuItem, IconButton} from 'react-mdl';
import {connect} from 'react-redux';

import {addToPlayQuereById} from '../../../actions/thunkActions';

class SongMenuButton extends React.PureComponent {
    render() {
        const {songId, addToPlayQuereById} = this.props;
        const id = `suluvir-song-menu-${songId}`
        return (
            <div>
                <IconButton name="more_vert" id={id} />
                <Menu target={id} align="right" ripple>
                    <MenuItem onClick={() => addToPlayQuereById(songId)}>Add to play quere</MenuItem>
                </Menu>
            </div>
        );
    }
}

SongMenuButton.propTypes = {
    addToPlayQuereById: React.PropTypes.func.isRequired,
    songId: React.PropTypes.string.isRequired
}

export default connect(undefined, {addToPlayQuereById})(SongMenuButton);