import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Controls from './Controls';

require('./Player.scss');

class Player extends React.Component {
    constructor() {
        super();
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    render() {
        const {songs} = this.props;

        const className = classNames('suluvir-player', {'suluvir-player--active': songs.size > 0});
        if (songs.size == 0) {
            return (<div id="suluvir-player" className={className}/>);
        }

        const songToPlay = songs.first();

        return (
            <div id="suluvir-player" className={className}>
                <audio id="demo" src={songToPlay.get('@stream')} autoPlay ref={audio => this.audio = audio}></audio>
                <div id="suluvir-player__controls">
                    <Controls play={this.play} pause={this.pause} />
                </div>
            </div>
        );
    }
}

Player.propTypes = {
    songs: React.PropTypes.instanceOf(Immutable.List).isRequired
}

function mapStateToProps(state) {
    return {
        songs: state.play
    };
}

export default connect(mapStateToProps)(Player);