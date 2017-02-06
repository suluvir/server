import * as React from 'react';

import Player from '../../components/player/Player';

require('./SinglePageApplication.scss');

export default class SinglePageApplication extends React.PureComponent<any, any> {
    render() {
        return (
            <div id="suluvir-spa">
                <div>test</div>
                <Player />
            </div>
        );
    }
}
