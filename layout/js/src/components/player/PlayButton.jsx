import React from 'react';
import {IconButton} from 'react-mdl';

export default class PlayButton extends React.PureComponent {
    render() {
        return <IconButton name="play_circle_outline" />;
    }
}

PlayButton.propTypes = {
    songId: React.PropTypes.string.isRequired
}