import React from 'react';

export default class Icon extends React.PureComponent {
    render() {
        return <i className="material-icons">{this.props.name}</i>
    }
}

Icon.propTypes = {
    name: React.PropTypes.string.isRequired
};
