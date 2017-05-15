import React from 'react';

export default class Error extends React.PureComponent {
    render() {
        const {details} = this.props;
        return (
            <div className="suluvir-error">
                {details}
            </div>
        );
    }
}

Error.propTypes = {
    details: React.PropTypes.string.isRequired,
    message: React.PropTypes.string.isRequired,
    status: React.PropTypes.number.isRequired
}