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
import {Slider} from 'react-mdl';

import {formatTime} from '../../utils/formatters';
import * as readyStates from '../../constants/readyState';

require('./TimeDisplay.scss');

export default class TimeDisplay extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            currentTime: 0
        };

        this.setCurrentTime = this.setCurrentTime.bind(this);
        setInterval(this.setCurrentTime, 1000);
    }

    getAudio() {
        const audio = this.props.getAudio();

        this.setState({
            audio
        })
    }

    setCurrentTime() {
        const {audio} = this.state;
        if (audio === undefined || audio === null) {
            return;
        }

        this.setState({
            currentTime: this.state.audio.currentTime
        })
    }

    componentWillReceiveProps(nextProps) {
        const {songId: current} = this.props;
        const {songId: next} = nextProps;

        if (current !== next) {
            this.setState({
                currentTime: 0
            });
        }
    }

    render() {
        const {audio, currentTime} = this.state;
        const {readyState} = this.props;
        if (audio === undefined || audio === null) {
            this.getAudio();
            return <div />;
        }

        if (readyState === readyStates.HAVE_NOTHING || readyState === undefined || readyState === null) {
            return <div />;
        }

        

        return (
            <div className="suluvir-timedisplay">
                <div className="suluvir-timedisplay__current-time">
                    {formatTime(currentTime)}
                </div>
                <div className="suluvir-hide-small suluvir-timedisplay__timeslider">
                    <Slider 
                        min={0} 
                        max={parseInt(audio.duration)} 
                        value={parseInt(currentTime)} 
                    />
                </div>
                <div className="suluvir-hide-small">
                    {formatTime(audio.duration - currentTime)}
                </div>
            </div>
        );
    }
}

TimeDisplay.propTypes = {
    getAudio: React.PropTypes.func.isRequired,
    readyState: React.PropTypes.number.isRequired,
    songId: React.PropTypes.string.isRequired
}
