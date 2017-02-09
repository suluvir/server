import React from 'react';
import {IconButton} from 'react-mdl';
import {connect} from 'react-redux';

import {playSongById} from '../../actions/thunkActions';

class PlayButton extends React.PureComponent {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {playSongById, songId} = this.props;
        playSongById(songId);
    }

    render() {
        return <IconButton name="play_circle_outline" onClick={this.onClick} />;
    }
}

PlayButton.propTypes = {
    playSongById: React.PropTypes.func.isRequired,
    songId: React.PropTypes.string.isRequired
};

export default connect(undefined, {playSongById})(PlayButton);
