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

import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';

require('./IconTextfield.scss');

export default class IconTextfield extends React.PureComponent {
    render() {
        const {icon, label, onChange, value, required, type, autoFocus} = this.props;
        return (
            <div className="suluvir-icon-textfield">
                <Icon>{icon}</Icon>
                <TextField
                    autoFocus={autoFocus}
                    fullWidth
                    label={label}
                    onChange={onChange}
                    required={required}
                    type={type}
                    value={value}
                />
            </div>
        );
    }
}

IconTextfield.propTypes = {
    autoFocus: PropTypes.any,
    error: PropTypes.string,
    icon: PropTypes.element.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    pattern: PropTypes.string,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string,
    value: PropTypes.string
}

IconTextfield.defaultProps = {
    required: false
}