import React from 'react';
import Immutable from 'immutable';
import {IconButton} from 'react-mdl';
import {connect} from 'react-redux';

import {playPlaylist} from '../../actions/thunkActions';

class PlayPlaylistButton extends React.PureComponent {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {playPlaylist, playlist} = this.props;
        playPlaylist(playlist);
    }

    render() {
        return (
            <IconButton name="play_circle_outline" onClick={this.onClick} />
        );
    }
}

PlayPlaylistButton.propTypes = {
    playlist: React.PropTypes.instanceOf(Immutable.Map).isRequired,
    playPlaylist: React.PropTypes.func.isRequired
}

export default connect(undefined, {playPlaylist})(PlayPlaylistButton);