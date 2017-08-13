import React from 'react';

require('./SmallLogoContainer.scss');

export default class SmallLogoContainer extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-small-logo-container mdc-card mdc-elevation--z3">
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
};
