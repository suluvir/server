import * as React from 'react';

import Player from '../../components/player/Player';
import HelloWorld from '../../components/HelloWorld';

export default class Test extends React.PureComponent<any, any> {
    render() {
        return (
            <div>
                <HelloWorld/>
                <Player/>
            </div>
        );
    }
}
