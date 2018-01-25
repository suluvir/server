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
import classNames from 'classnames';

import Paper from 'material-ui/Paper';

import Controls from './Controls';
import SongInfo from './SongInfo';
import TimeDisplay from './TimeDisplay';
import Volume from './Volume';

import {nextSong} from '../../actions/actions';

import {PLAYER} from '../../classes/play/Player';

require('./Player.scss');

class Player extends React.Component {
    constructor() {
        super();
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
        this.state = {};

        PLAYER.setSongFinishedCallback(this.playNextSong);
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.volume !== nextProps.volume) {
            PLAYER.setVolume(nextProps.volume);
        }
    }

    playNextSong() {
        const {nextSong, hasNext} = this.props;
        if (hasNext) {
            nextSong();
        }
    }

    render() {
        const {playList, current} = this.props;

        const active = playList !== undefined && playList !== null &&
            playList.size > 0 && playList.size > current;
        const className = classNames('suluvir-player', {'suluvir-player--active': active});
        if (!active) {
            return (<div id="suluvir-player" className={className}/>);
        }

        const songToPlay = playList.get(current);
        PLAYER.playSong(songToPlay);

        return (
            <Paper elevation={3}>
                <div id="suluvir-player" className={className}>
                    <div id="suluvir-player__songinfo">
                        <SongInfo song={songToPlay} />
                    </div>
                    <div id="suluvir-player__controls">
                        <Controls play={PLAYER.play} pause={PLAYER.pause} songToPlay={songToPlay} />
                    </div>
                    <div id="suluvir-player__timedisplay">
                        <TimeDisplay song={songToPlay} />
                    </div>
                    <div className="suluvir-player__volume-container">
                        <Volume />
                    </div>
                </div>
            </Paper>
        );
    }
}

Player.propTypes = {
    current: PropTypes.number,
    hasNext: PropTypes.bool.isRequired,
    nextSong: PropTypes.func.isRequired,
    playList: PropTypes.instanceOf(Immutable.Map),
    volume: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    return {
        hasNext: state.play.get('list').size > state.play.get('current') + 1,
        playList: state.play.get('list'),
        current: state.play.get('current'),
        volume: state.play.get('volume')
    };
}

export default connect(mapStateToProps, {nextSong})(Player);
