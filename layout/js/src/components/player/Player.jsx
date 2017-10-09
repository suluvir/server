import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Controls from './Controls';
import SongInfo from './SongInfo';
import TimeDisplay from './TimeDisplay';
import Volume from './Volume';

import {nextSong} from '../../actions/actions';

require('./Player.scss');

class Player extends React.Component {
    constructor() {
        super();
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.playNextSong = this.playNextSong.bind(this);
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

    componentWillReceiveProps(nextProps) {
        if (this.audio === undefined || this.audio === null) {
            return;
        }
        this.audio.volume = nextProps.volume;
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
        const className = classNames('suluvir-player', 'mdl-shadow--3dp', {'suluvir-player--active': active});
        if (!active) {
            return (<div id="suluvir-player" className={className}/>);
        }

        const songToPlay = playList.get(current);

        return (
            <div id="suluvir-player" className={className}>
                <audio 
                    autoPlay
                    onEnded={this.playNextSong}
                    onLoadedData={this.setReadyState}
                    src={songToPlay.get('@stream')}
                    ref={audio => this.audio = audio}
                >
                </audio>
                <div id="suluvir-player__songinfo">
                    <SongInfo song={songToPlay} />
                </div>
                <div id="suluvir-player__controls">
                    <Controls getAudio={() => this.audio} play={this.play} pause={this.pause} songToPlay={songToPlay} />
                </div>
                <div id="suluvir-player__timedisplay">
                    <TimeDisplay getAudio={() => this.audio} readyState={this.state.readyState} songId={songToPlay.get('@id')} />
                </div>
                <div className="suluvir-player__volume-container">
                    <Volume />
                </div>
            </div>
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
