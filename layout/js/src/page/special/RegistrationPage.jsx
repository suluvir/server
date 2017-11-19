// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import {Link} from 'react-router-dom';

import IconTextfield from '../../components/util/IconTextfield';
import SmallLogoContainer from '../../components/util/SmallLogoContainer';

import Button from '../../components/material/Button';

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

        const data = {
            username,
            email,
            password,
            password_repeat,
            provider: 'suluvir'
        };
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

                        <Button onClick={this.registerUser} raised>
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
