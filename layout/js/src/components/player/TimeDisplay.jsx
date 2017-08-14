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
