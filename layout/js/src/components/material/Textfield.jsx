import React from 'react';
import {textfield} from 'material-components-web';

let idCounter = 1;

require('./Textfield.scss');

export default class Textfield extends React.PureComponent {
    constructor() {
        super();
        this.id = Textfield.newId();
    }

    static newId() {
        return `suluvir-textfield-id-${++idCounter}`;
    }

    componentDidMount() {
        this.textfield = new textfield.MDCTextfield(this.tfRoot);
    }

    render() {
        const {required, label, ...other} = this.props;

        const labelNode = label !== '' ? 
            <label htmlFor={this.id} className="mdc-textfield__label">{label}</label> : 
            undefined;

        return (
            <div 
                className="suluvir-textfield mdc-textfield mdc-textfield--upgraded"
                ref={tfRoot => this.tfRoot = tfRoot}
            >
                <input 
                    id={this.id}
                    className={'mdc-textfield__input'} 
                    required={required}
                    ref={input => this.input = input}
                    {...other} 
                />
                {labelNode}
            </div>
        );
    }
}

Textfield.propTypes = {
    required: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string
};

Textfield.defaultProps = {
    required: false
}