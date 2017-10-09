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
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Button extends React.PureComponent {
    render() {
        const clazzes = classNames('mdc-button', 'mdc-ripple-upgraded',
            {'mdc-button--raised': this.props.raised},
            this.props.className);
        return (
            <button className={clazzes}>
                {this.props.children}
            </button>
        );
    }
}

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired,
    raised: PropTypes.bool.isRequired
}

Button.defaultProps = {
    raised: false
}
