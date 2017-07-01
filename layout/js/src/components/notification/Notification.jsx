import React from 'react';
import classNames from 'classnames';

import {IconButton} from 'react-mdl';

require('./Notification.scss');

export default class Notification extends React.PureComponent {
    render() {
        const {details, type} = this.props;

        const className = classNames('mdl-shadow--3dp', 'suluvir-notification', `suluvir-notification--color-${type}`)
        return (
            <div className={className}>
                <div className="suluvir-notification__details">
                    {details}
                </div>
                <div className="suluvir-notification__close">
                    <IconButton name="close"/>
                </div>
            </div>
        );
    }
}

Notification.propTypes = {
    details: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    status: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(['info', 'warning', 'error']).isRequired
}