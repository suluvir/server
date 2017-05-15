import React from 'react';

import ErrorList from '../components/error/ErrorList';

require('./SmallLogoContainer.scss');

export default class SmallLogoContainer extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-small-logo-container mdl-card mdl-shadow--3dp">
                <div>
                    <img src="/static/img/logo/svg/suluvir.svg" alt="Logo" className="suluvir-small-logo-container__logo"/>
                </div>

                <div className="suluvir-small-logo-container__errors">
                    <ErrorList/>
                </div>

                {this.props.children}
            </div>
        );
    }
}

SmallLogoContainer.propTypes = {
    children: React.PropTypes.any.isRequired
}