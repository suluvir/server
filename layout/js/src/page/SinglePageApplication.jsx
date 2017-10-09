import React from 'react';
import PropTypes from 'prop-types';

require('./SinglePageApplication.scss');

export default class SinglePageApplication extends React.PureComponent {
    render() {
        const {component} = this.props;

        return (
            <div id="suluvir-spa">
                <div className="suluvir-content">
                    {React.createElement(component, this.props)}
                </div>
            </div>
        );
    }
}

SinglePageApplication.propTypes = {
    component: PropTypes.any.isRequired
};
