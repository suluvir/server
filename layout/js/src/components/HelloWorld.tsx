import * as React from 'react';

interface HelloWorldProps {compiler: string; framework: string};

export class HelloWorld extends React.Component<HelloWorldProps, undefined> {
    constructor() {
        super();
    }

    render() {
        return (
            <h1>
                Hello from {this.props.compiler} and {this.props.framework}
            </h1>
        );
    }
}
