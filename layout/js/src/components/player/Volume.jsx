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
import {Slider, IconButton} from 'react-mdl';
import {connect} from 'react-redux';

import {setVolume} from '../../actions/actions';

const VOLUME_UP = 0.8;
const VOLUME_DOWN = 0;

require('./Volume.scss');

class Volume extends React.PureComponent {
    constructor() {
        super();
        this.volumeChange = this.volumeChange.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.state = {
            muted: false,
            unmutedVolume: 1
        }
    }

    volumeChange(event) {
        const unmutedVolume = event.target.value / 100;
        this.props.setVolume(unmutedVolume);
        this.setState({
            unmutedVolume
        });
    }

    toggleMute() {
        const {muted, unmutedVolume} = this.state;
        const {setVolume} = this.props;

        if (!muted) {
            // not muted, so mute
            setVolume(0);
        } else {
            setVolume(unmutedVolume);
        }

        this.setState({
            muted: !muted
        })
    }

    render() {
        const {volume} = this.props;
        let iconName = 'volume_mute';
        if (volume > VOLUME_DOWN) {
            iconName = 'volume_down';
        }
        if (volume > VOLUME_UP) {
            iconName = 'volume_up';
        }
        return (
            <div className="suluvir-player__volume suluvir-hide-extra-small">
                <IconButton name={iconName} onClick={this.toggleMute} />
                <Slider min={0} max={100} onChange={this.volumeChange} value={this.props.volume * 100} />
            </div>
        );
    }
}

Volume.propTypes = {
    setVolume: PropTypes.func.isRequired,
    volume: PropTypes.number.isRequired
}

function mapStateToProps(state) {
    return {
        volume: state.play.get('volume')
    }
}

export default connect(mapStateToProps, {setVolume})(Volume);