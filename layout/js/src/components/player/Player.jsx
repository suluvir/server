import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import classNames from 'classnames';

require('./Player.scss');

class Player extends React.Component {
    render() {
        const {songs} = this.props;

        const className = classNames('suluvir-player', {'suluvir-player--active': songs.size > 0});
        if (songs.size == 0) {
            return (
                <div id="suluvir-player" className={className}>
                    test
                </div>
            );
        }

        const songToPlay = songs.first();

        return (
            <div id="suluvir-player" className={className}>
                test
                <audio id="demo" src={songToPlay.get('@stream')} autoPlay>

                </audio>
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