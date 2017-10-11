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

import {postJson} from '../../utils/fetch';
import {getSetup} from '../../utils/helpers';

import SmallLogoContainer from '../../components/util/SmallLogoContainer';
import IconTextfield from '../../components/util/IconTextfield';

import Button from '../../components/material/Button';

require('./LoginPage.scss');

export default class LoginPage extends React.PureComponent {
    constructor() {
        super();

        this.state = {};
        this.login = this.login.bind(this);
        this.suluvirOnGoogleSignin = this.suluvirOnGoogleSignin.bind(this);

        // write function to global namespace on purpose to allow the google sign in button to trigger it
        window.suluvirOnGoogleSignin = this.suluvirOnGoogleSignin;
    }

    onInputChange(stateKey) {
        return event => {
            this.setState({[stateKey]: event.target.value});
        }
    }

    login(event) {
        const {login, password} = this.state;

        event.preventDefault();

        postJson('/api/internal/user/login', {login, password}).then(this.redirectToOverview);
    }

    suluvirOnGoogleSignin(googleUser) {
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        const login = profile.getName();
        const image = profile.getImageUrl();
        const email = profile.getEmail();

        const url = getSetup().getIn(['oauth_providers', 'google', 'url']);
        const data = {
            id_token,
            login,
            image,
            email
        }

        postJson(url, data).then(this.redirectToOverview);
    }

    redirectToOverview() {
        window.location.href = '/';
    }

    renderLoginForm() {
        return (
            <form className="suluvir-login__form" onSubmit={this.login}>
                <div>
                    <IconTextfield
                        autoFocus
                        error="Username is too long"
                        iconName="person"
                        label="Username / E-Mail"
                        onChange={this.onInputChange('login')}
                        pattern="\S{0,120}"
                    />
                    <IconTextfield
                        iconName="vpn_key"
                        type="password"
                        label="Password"
                        onChange={this.onInputChange('password')}
                    />
                </div>

                <Button onClick={this.login} raised>
                    Login
                </Button>

                <br className="clear"/>
            </form>
        );
    }

    renderGoogleLogin() {
        if (getSetup().getIn(['oauth_providers', 'google']) === undefined) {
            return undefined;
        }

        return (
            <div>
                <hr/>
                <div className="g-signin2" data-onsuccess="suluvirOnGoogleSignin"></div>
            </div>
        );
    }

    renderRegistrationLink() {
        if (getSetup().get('registration_disabled')) {
            return undefined;
        }
        return (
            <div>
                <hr/>
                <Link to="/register" className="suluvir-login__registration-link">Not having an account? Register!</Link>
            </div>
        );
    }

    render() {
        return (
            <div className="suluvir-login">
                <SmallLogoContainer>
                    {this.renderLoginForm()}
                    {this.renderGoogleLogin()}
                    {this.renderRegistrationLink()}
                </SmallLogoContainer>
            </div>
        );
    }
}
