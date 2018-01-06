// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import PropTypes from 'prop-types';
import {textfield} from 'material-components-web';

import classNames from 'classnames';

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
    autoFocus: PropTypes.any,
    className: PropTypes.string,
    required: PropTypes.bool.isRequired,
    label: PropTypes.string
};

Textfield.defaultProps = {
    required: false
}
