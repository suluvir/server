import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Controls from './Controls';
import SongInfo from './SongInfo';
import TimeDisplay from './TimeDisplay';

require('./Player.scss');

class Player extends React.Component {
    constructor() {
        super();
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.state = {};

        this.setReadyState = this.setReadyState.bind(this);
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    setReadyState() {
        this.setState({
            readyState: this.audio.readyState
        });
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

        return (
            <div id="suluvir-player" className={className}>
                <audio 
                    autoPlay
                    onLoadedData={this.setReadyState}
                    src={songToPlay.get('@stream')}
                    ref={audio => this.audio = audio}
                >
                </audio>
                <div id="suluvir-player__songinfo">
                    <SongInfo song={songToPlay} />
                </div>
                <div id="suluvir-player__controls">
                    <Controls play={this.play} pause={this.pause} songToPlay={songToPlay} />
                </div>
                <div id="suluvir-player__timedisplay">
                    <TimeDisplay getAudio={() => this.audio} readyState={this.state.readyState} />
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    current: React.PropTypes.number,
    playList: React.PropTypes.instanceOf(Immutable.Map)
}

function mapStateToProps(state) {
    return {
        playList: state.play.get('list'),
        current: state.play.get('current')
    };
}

export default connect(mapStateToProps)(Player);
