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
