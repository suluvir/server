import React from 'react';
import {Button} from 'react-mdl';

import IconTextfield from '../../components/util/IconTextfield';

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
                <div className="suluvir-registration__container mdl-card mdl-shadow--3dp">
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
                                    value={password}
                                />
                                <IconTextfield
                                    iconName="vpn_key"
                                    label="Repeat Password"
                                    onChange={this.onInputChange('password_repeat')}
                                    value={password_repeat}
                                />
                            </div>

                            <Button onClick={this.registerUser}>
                                Register
                            </Button>

                            <br className="clear"/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}