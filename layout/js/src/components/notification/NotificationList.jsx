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