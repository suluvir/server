import * as React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-mdl';

import {playSong} from '../actions/actions';
import {Play} from '../reducers/states';

interface HelloWorldProps {playSong:any}

class HelloWorld extends React.Component<HelloWorldProps, void> {
    onClick() {
        const play: Play = {
            url: "test"
        };
        this.props.playSong(play);
    }

    render() {
        return (
            <Button onClick={this.onClick.bind(this)}>
                Play
            </Button>
        );
    }
}

export default connect(undefined, {playSong})(HelloWorld);
