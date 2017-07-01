import React from 'react';
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
    closeNotification: React.PropTypes.func.isRequired,
    details: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    status: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(['info', 'warning', 'error']).isRequired,
    id: React.PropTypes.number
}

export default connect(undefined, {closeNotification})(Notification);