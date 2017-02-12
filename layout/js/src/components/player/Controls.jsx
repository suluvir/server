import React from 'react';
import {IconButton} from 'react-mdl';

export default class Controls extends React.PureComponent {
    constructor() {
        super();
        this.togglePlayPause = this.togglePlayPause.bind(this);

        this.state = {
            play: true // play initially because of autoplay
        };
    }

    togglePlayPause() {
        const {play: playFunc, pause: pauseFunc} = this.props;
        const {play} = this.state;

        if (play) {
            pauseFunc();
        } else {
            playFunc();
        }

        this.setState({
            play: !play
        });
    }

    render() {
        const {play} = this.state;
        return (
            <div>
                <IconButton name={play ? 'pause_circle_filled' : 'play_circle_filled'} colored ripple onClick={this.togglePlayPause} />
            </div>
        );
    }
}

Controls.propTypes = {
    play: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired
}