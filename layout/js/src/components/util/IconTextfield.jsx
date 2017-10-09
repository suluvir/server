// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
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

import Textfield from '../material/Textfield';
import Icon from '../material/Icon';

require('./IconTextfield.scss');

export default class IconTextfield extends React.PureComponent {
    render() {
        const {error, iconName, label, onChange, pattern, value, required, type, autoFocus} = this.props;
        return (
            <div className="suluvir-icon-textfield">
                <Icon name={iconName} />
                <Textfield
                    autoFocus={autoFocus}
                    error={error}
                    label={label}
                    onChange={onChange}
                    pattern={pattern}
                    required={required}
                    type={type}
                    value={value}
                />
            </div>
        );
    }
}

IconTextfield.propTypes = {
    autoFocus: React.PropTypes.any,
    error: React.PropTypes.string,
    iconName: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    pattern: React.PropTypes.string,
    required: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string,
    value: React.PropTypes.string
}

IconTextfield.defaultProps = {
    required: false
}