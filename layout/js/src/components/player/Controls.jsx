// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
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
    getAudio: React.PropTypes.func.isRequired,
    hasPrevious: React.PropTypes.bool.isRequired,
    hasNext: React.PropTypes.bool.isRequired,
    nextSong: React.PropTypes.func.isRequired,
    pause: React.PropTypes.func.isRequired,
    play: React.PropTypes.func.isRequired,
    previousSong: React.PropTypes.func.isRequired,
    songToPlay: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state) {
    return {
        hasNext: state.play.get('list').size > state.play.get('current') + 1,
        hasPrevious: state.play.get('current') > 0
    }
}

export default connect(mapStateToProps, {nextSong, previousSong})(Controls);