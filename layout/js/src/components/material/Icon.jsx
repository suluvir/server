import React from 'react';
import PropTypes from 'prop-types';

export default class Icon extends React.PureComponent {
    render() {
        return <i className="material-icons">{this.props.name}</i>
    }
}

Icon.propTypes = {
    name: PropTypes.string.isRequired
};
