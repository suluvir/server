import React from 'react';
import {Button} from 'react-mdl';
import {Link} from 'react-router';

import SmallLogoContainer from '../../containers/SmallLogoContainer';
import IconTextfield from '../../components/util/IconTextfield';

require('./LoginPage.scss');

export default class LoginPage extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-login">
                <SmallLogoContainer>
                    <form className="suluvir-login__form">
                        <div>
                            <IconTextfield 
                                error="Username is too long"
                                iconName="person" 
                                label="Username"
                                pattern="\S{0,120}"
                            />
                            <IconTextfield 
                                iconName="vpn_key" 
                                type="password"
                                label="Password"
                            />
                        </div>

                        <Button>
                            Login
                        </Button>

                        <br className="clear"/>

                        <Link to="/register" className="suluvir-login__registration-link">Not having an account? Register!</Link>
                    </form>
                </SmallLogoContainer>
            </div>
        );
    }
}