import React from 'react';
import {IconButton} from 'react-mdl';
import {connect} from 'react-redux';

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
            return <IconButton name={"play_circle_filled"}/>;
        }
        return <IconButton name="play_circle_outline" onClick={this.onClick} />;
    }
}

PlaySongButton.propTypes = {
    currentlyPlaying: React.PropTypes.bool.isRequired,
    playSongById: React.PropTypes.func.isRequired,
    songId: React.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    const currentlyPlaying = state.play.get('list').get(state.play.get('current')) !== undefined && 
        state.play.get('list').get(state.play.get('current')).get('@id') === ownProps.songId;
    return {
        currentlyPlaying
    }
}

export default connect(mapStateToProps, {playSongById})(PlaySongButton);
