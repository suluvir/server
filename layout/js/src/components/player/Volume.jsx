import React from 'react';
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
    }

    volumeChange(event) {
        this.props.setVolume(event.target.value / 100);
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
            <div className="suluvir-player__volume">
                <IconButton name={iconName} />
                <Slider min={0} max={100} onChange={this.volumeChange} value={this.props.volume * 100} />
            </div>
        );
    }
}

Volume.propTypes = {
    setVolume: React.PropTypes.func.isRequired,
    volume: React.PropTypes.number.isRequired
}

function mapStateToProps(state) {
    return {
        volume: state.play.get('volume')
    }
}

export default connect(mapStateToProps, {setVolume})(Volume);