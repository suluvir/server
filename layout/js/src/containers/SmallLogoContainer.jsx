import React from 'react';

require('./SmallLogoContainer.scss');

export default class SmallLogoContainer extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-small-logo-container mdl-card mdl-shadow--3dp">
                <div>
                    <img src="/static/img/logo/svg/suluvir.svg" alt="Logo" className="suluvir-small-logo-container__logo"/>
                </div>

                {this.props.children}
            </div>
        );
    }
}

SmallLogoContainer.propTypes = {
    children: React.PropTypes.any.isRequired
}