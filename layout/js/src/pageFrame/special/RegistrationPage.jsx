import React from 'react';
import {Button} from 'react-mdl';

import IconTextfield from '../../components/util/IconTextfield';

require('./RegistrationPage.scss');

export default class RegistrationPage extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-registration">
                <div>
                    <img src="/static/img/logo/svg/suluvir.svg" alt="Logo" className="suluvir-registration__logo"/>
                </div>

                <div className="suluvir-registration__form-container">
                    <form className="suluvir-registration__form">
                        <div>
                            <IconTextfield 
                                error="Username is too long"
                                iconName="person" 
                                label="Username"
                                pattern="\S{0,120}"
                            />
                            <IconTextfield
                                error="Has to be a valid email"
                                iconName="email" 
                                label="E-Mail Adress"
                                pattern="\S+@\S+\.[a-z]{2,3}"
                            />
                            <IconTextfield iconName="vpn_key" label="Password" />
                            <IconTextfield iconName="vpn_key" label="Repeat Password" />
                        </div>

                        <Button>
                            Register
                        </Button>

                        <br className="clear"/>
                    </form>
                </div>
            </div>
        );
    }
}