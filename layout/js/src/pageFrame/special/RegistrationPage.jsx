import React from 'react';
import {Button} from 'react-mdl';

import IconTextfield from '../../components/util/IconTextfield';

require('./RegistrationPage.scss');

export default class RegistrationPage extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-registration">
                <div className="suluvir-registration__form-container">
                    <form className="suluvir-registration__form">
                        <div>
                            <IconTextfield iconName="person" label="Username" />
                            <IconTextfield iconName="email" label="E-Mail Adress" />
                            <IconTextfield iconName="vpn_key" label="Password" />
                            <IconTextfield iconName="vpn_key" label="Repeat Password" />
                        </div>

                        <Button>
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}