// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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
import {connect} from 'react-redux';

import IconButton from 'material-ui/IconButton';
import SkipPreviousButton from 'material-ui-icons/SkipPrevious';
import SkipNextButton from 'material-ui-icons/SkipNext';
import PlayCircleFilledButton from 'material-ui-icons/PlayCircleFilled';
import PauseCircleFilled from 'material-ui-icons/PauseCircleFilled';

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

        const playPauseButton = play ? <PauseCircleFilled color="primary"/> : <PlayCircleFilledButton color="primary"/>;

        return (
            <div>
                <IconButton disabled={!hasPrevious} ripple onClick={previousSong}>
                    <SkipPreviousButton/>
                </IconButton>
                <IconButton colored ripple onClick={this.togglePlayPause}>
                    {playPauseButton}
                </IconButton>
                <IconButton disabled={!hasNext} ripple onClick={nextSong}>
                    <SkipNextButton/>
                </IconButton>
            </div>
        );
    }
}

Controls.propTypes = {
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