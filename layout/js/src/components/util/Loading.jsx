import React from 'react';
import {Spinner} from 'react-mdl';

require('./Loading.scss');

export default class Loading extends React.Component {
    render() {
        return (
            <div className="suluvir-loading-indicator">
                <Spinner />
            </div>
        );
    }
}