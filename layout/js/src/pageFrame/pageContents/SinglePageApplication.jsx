import React from 'react';

import Player from '../../components/player/Player';
import MySongList from '../../components/lists/MySongList';

require('./SinglePageApplication.scss');

export default class SinglePageApplication extends React.PureComponent {
    render() {
        return (
            <div id="suluvir-spa">
                <MySongList />
                <Player />
            </div>
        );
    }
}