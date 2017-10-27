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
import PropTypes from 'prop-types';
import {Slider} from 'react-mdl';

import {formatTime} from '../../utils/formatters';

import {PLAYER} from '../../classes/play/Player';

require('./TimeDisplay.scss');

export default class TimeDisplay extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            currentTime: 0,
            show: false
        };

        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.audioLoaded = this.audioLoaded.bind(this);

        PLAYER.setAudioLoadedCallback(this.audioLoaded);

        setInterval(this.setCurrentTime, 1000);
    }

    audioLoaded() {
        this.setState
    }

    setCurrentTime() {
        this.setState({
            currentTime: PLAYER.getCurrentTime()
        })
    }

    componentWillReceiveProps(nextProps) {
        const {song: current} = this.props;
        const {song: next} = nextProps;

        if (current !== next) {
            this.setState({
                currentTime: 0
            });
        }
    }

    render() {
        const {currentTime} = this.state;
        const {song} = this.props;

        return (
            <div className="suluvir-timedisplay">
                <div className="suluvir-timedisplay__current-time">
                    {formatTime(currentTime)}
                </div>
                <div className="suluvir-hide-small suluvir-timedisplay__timeslider">
                    <Slider
                        min={0}
                        max={parseInt(song.get('duration'))}
                        value={parseInt(currentTime)}
                    />
                </div>
                <div className="suluvir-hide-small">
                    {formatTime(song.get('duration') - currentTime)}
                </div>
            </div>
        );
    }
}

TimeDisplay.propTypes = {
    song: PropTypes.instanceOf(Immutable.Map).isRequired
}
