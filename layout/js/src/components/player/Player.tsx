import * as React from 'react';
import {connect} from 'react-redux';
import * as Immutable from 'immutable';

import {Play} from '../../reducers/states';

interface PlayerProps {
    playSongs: Immutable.List<Play>
}

class Player extends React.Component<PlayerProps, undefined> {
    render() {
        const result: string[] = []
        this.props.playSongs.forEach(play => {
            result.push(play.url)
        });
        return (
            <div id="suluvir-player">
                {result}
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        playSongs: state.play
    }
}

export default connect(mapStateToProps)(Player);
