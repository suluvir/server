import React from 'react';
import {textfield} from 'material-components-web';

import classNames from 'classNames';

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
        const {required, label, autoFocus, className, ...other} = this.props;

        const labelClasses = classNames('mdc-textfield__label', {'mdc-textfield__label--float-above': this.props.autoFocus});
        const labelNode = label !== '' ? 
            <label htmlFor={this.id} className={labelClasses}>{label}</label> : 
            undefined;
        
        const rootClasses = classNames('suluvir-textfield', 'mdc-textfield', 'mdc-textfield--upgraded', className,
            {'mdc-textfield--focused': autoFocus});

        return (
            <div 
                className={rootClasses}
                ref={tfRoot => this.tfRoot = tfRoot}
            >
                <input
                    autoFocus={autoFocus}
                    id={this.id}
                    className="mdc-textfield__input"
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
    autoFocus: React.PropTypes.any,
    className: React.PropTypes.string,
    required: React.PropTypes.bool.isRequired,
    label: React.PropTypes.string
};

Textfield.defaultProps = {
    required: false
}