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