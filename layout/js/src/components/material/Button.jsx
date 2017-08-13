import React from 'react';
import classNames from 'classNames';

export default class Button extends React.PureComponent {
    render() {
        const clazzes = classNames('mdc-button', 'mdc-ripple-upgraded',
            {'mdc-button--raised': this.props.raised});
        return (
            <button className={clazzes}>
                {this.props.children}
            </button>
        );
    }
}

Button.propTypes = {
    children: React.PropTypes.any.isRequired,
    raised: React.PropTypes.bool.isRequired
}

Button.defaultProps = {
    raised: false
}