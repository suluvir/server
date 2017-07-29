import React from 'react';

import {setWindowTitle} from '../../utils/helpers';

export default class Overview extends React.PureComponent {
    componentWillMount() {
        setWindowTitle(undefined);
    }

    render() {
        return (
            <div/>
        );
    }
}