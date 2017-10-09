import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {IconButton} from 'react-mdl';
import {connect} from 'react-redux';

import {nextSong, previousSong} from '../../actions/actions';

class Controls extends React.PureComponent {
    constructor() {
        super();
        this.togglePlayPause = this.togglePlayPause.bind(this);

        this.state = {
            play: true // play initially because of autoplay
        };
    }

    pressPrevious() {

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
        const {hasNext, hasPrevious, nextSong, previousSong} = this.props;
        return (
            <div>
                <IconButton disabled={!hasPrevious} name="skip_previous" ripple onClick={previousSong} />
                <IconButton name={play ? 'pause_circle_filled' : 'play_circle_filled'} colored ripple onClick={this.togglePlayPause} />
                <IconButton disabled={!hasNext} name="skip_next" ripple onClick={nextSong} />
            </div>
        );
    }
}

Controls.propTypes = {
    getAudio: PropTypes.func.isRequired,
    hasPrevious: PropTypes.bool.isRequired,
    hasNext: PropTypes.bool.isRequired,
    nextSong: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    previousSong: PropTypes.func.isRequired,
    songToPlay: PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state) {
    return {
        hasNext: state.play.get('list').size > state.play.get('current') + 1,
        hasPrevious: state.play.get('current') > 0
    }
}

export default connect(mapStateToProps, {nextSong, previousSong})(Controls);