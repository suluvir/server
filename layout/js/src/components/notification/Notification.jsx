import React from 'react';

export default class Notification extends React.PureComponent {
    render() {
        const {details} = this.props;
        return (
            <div className="suluvir-notification">
                {details}
            </div>
        );
    }
}

Notification.propTypes = {
    details: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    status: React.PropTypes.number.isRequired,
    type: React.PropTypes.string.isRequired
}