import React from 'react';
import {Button} from 'react-mdl';
import {Link} from 'react-router';

import IconTextfield from '../../components/util/IconTextfield';
import SmallLogoContainer from '../../containers/SmallLogoContainer';

import {postJson} from '../../utils/fetch';

require('./RegistrationPage.scss');

export default class RegistrationPage extends React.PureComponent {
    constructor() {
        super();

        this.state = {};
        this.registerUser = this.registerUser.bind(this);
    }

    onInputChange(stateKey) {
        return event => {
            this.setState({[stateKey]: event.target.value});
        }
    }

    registerUser(event) {
        event.preventDefault();

        const {username, email, password, password_repeat} = this.state;

        const data = {username, email, password, password_repeat};
        postJson('/api/internal/user/register', data).then(() => {
            window.location.href = '/login';
        });
    }

    render() {
        const {username, email, password, password_repeat} = this.state;

        return (
            <div className="suluvir-registration">
                <SmallLogoContainer>
                    <form className="suluvir-registration__form" onSubmit={this.registerUser}>
                        <div>
                            <IconTextfield 
                                autoFocus
                                error="Username is too long"
                                iconName="person" 
                                label="Username"
                                onChange={this.onInputChange('username')}
                                pattern="\S{0,120}"
                                value={username}
                            />
                            <IconTextfield
                                error="Has to be a valid email"
                                iconName="email" 
                                label="E-Mail Adress"
                                onChange={this.onInputChange('email')}
                                pattern="\S+@\S+\.[a-z]{2,3}"
                                value={email}
                            />
                            <IconTextfield 
                                iconName="vpn_key" 
                                label="Password"
                                onChange={this.onInputChange('password')} 
                                type="password"
                                value={password}
                            />
                            <IconTextfield
                                iconName="vpn_key"
                                label="Repeat Password"
                                onChange={this.onInputChange('password_repeat')}
                                type="password"
                                value={password_repeat}
                            />
                        </div>

                        <Button onClick={this.registerUser}>
                            Register
                        </Button>

                        <br className="clear"/>

                        <Link to="/login" className="suluvir-registration__login-link">Already have an account? Login!</Link>
                    </form>
                </SmallLogoContainer>
            </div>
        );
    }
}