import React from 'react';
import Immutable from 'immutable';
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

    componentWillReceiveProps(nextProps) {
        const {songToPlay: currentSongToPlay} = this.props;
        const {songToPlay: newSongToPlay} = nextProps;
        if (currentSongToPlay !== newSongToPlay) {
            this.setState({
                play: true
            });
        }
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
    pause: React.PropTypes.func.isRequired,
    songToPlay: React.PropTypes.instanceOf(Immutable.Map).isRequired
}