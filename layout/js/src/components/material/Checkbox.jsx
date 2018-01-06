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

let id = 1;

export default class Checkbox extends React.PureComponent {
    constructor() {
        super();

        this.id = Checkbox.newId();
    }

    static newId() {
        return `suluvir-checkbox-id-${id++}`;
    }

    render() {
        const {label, defaultChecked, ...other} = this.props;

        const labelDom = label === undefined ? undefined :
            <label htmlFor={this.id}>{label}</label>;

        return (
            <div className="suluvir-checkbox mdc-form-field">
                <div className="mdc-checkbox">
                    <input type="checkbox"
                        id={this.id}
                        className="mdc-checkbox__native-control"
                        defaultChecked={defaultChecked}
                        {...other}/>
                    <div className="mdc-checkbox__background">
                        <svg className="mdc-checkbox__checkmark"
                            viewBox="0 0 24 24">
                            <path className="mdc-checkbox__checkmark__path"
                                fill="none"
                                stroke="white"
                                d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
                        </svg>
                        <div className="mdc-checkbox__mixedmark"></div>
                    </div>
                </div>
                {labelDom}
            </div>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string,
    defaultChecked: PropTypes.bool.isRequired
};

Checkbox.defaultProps = {
    defaultChecked: false
};
