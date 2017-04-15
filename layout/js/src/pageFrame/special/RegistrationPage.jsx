import React from 'react';
import {Button, Textfield, Icon} from 'react-mdl';

require('./RegistrationPage.scss');

export default class RegistrationPage extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-registration">
                <div className="suluvir-registration__form-container">
                    <form className="suluvir-registration__form">
                        <div>
                            <div>
                                <Icon name="person" />
                                <Textfield floatingLabel label="Username" />
                            </div>
                            <div>
                                <Icon name="email" />
                                <Textfield floatingLabel label="E-Mail Adress" />
                            </div>
                            <div>
                                <Icon name="vpn_key" />
                                <Textfield floatingLabel label="Password" />
                            </div>
                            <div>
                                <Icon name="vpn_key" />
                                <Textfield floatingLabel label="Repeat password" />
                            </div>
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