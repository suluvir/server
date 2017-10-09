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
import {connect} from 'react-redux';

import {closeNotification} from '../../actions/notificationActions';

import {IconButton} from 'react-mdl';

require('./Notification.scss');

class Notification extends React.PureComponent {
    render() {
        const {details, type} = this.props;

        const className = classNames('mdl-shadow--3dp', 'suluvir-notification', `suluvir-notification--color-${type}`)
        return (
            <div className={className}>
                <div className="suluvir-notification__details">
                    {details}
                </div>
                <div className="suluvir-notification__close">
                    <IconButton name="close" onClick={() => this.props.closeNotification(this.props.id)}/>
                </div>
            </div>
        );
    }
}

Notification.propTypes = {
    closeNotification: PropTypes.func.isRequired,
    details: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['info', 'warning', 'error']).isRequired,
    id: PropTypes.number
}

export default connect(undefined, {closeNotification})(Notification);