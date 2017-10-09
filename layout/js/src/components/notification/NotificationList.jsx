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
import Immutable from 'immutable';
import {connect} from 'react-redux';

import Notification from './Notification';

require('./NotificationList.scss');

class NotificationList extends React.PureComponent {
    render() {
        const {notifications} = this.props;
        const display = [];
        
        notifications.forEach(notification => display.push(
            <Notification
                details={notification.get('details')}
                message={notification.get('message')}
                status={notification.get('status')}
                type={notification.get('type')}
                id={notification.get('id')}
            />
        ));

        return (
            <div className="suluvir-notification-list">
                {display}
            </div>
        );
    }
}

NotificationList.propTypes = {
    notifications: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications
    };
}

export default connect(mapStateToProps)(NotificationList);