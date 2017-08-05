import React from 'react';
import {Button} from 'react-mdl';
import {Link} from 'react-router';

import {postJson} from '../../utils/fetch';
import {getSetup} from '../../utils/helpers';

import SmallLogoContainer from '../../components/util/SmallLogoContainer';
import IconTextfield from '../../components/util/IconTextfield';

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

                <Button onClick={this.login}>
                    Login
                </Button>

                <br className="clear"/>
            </form>
        );
    }

    renderGoogleLogin() {
        return <div className="g-signin2" data-onsuccess="suluvirOnGoogleSignin"></div>;
    }

    render() {
        const registationLink = getSetup().get('registration_disabled') ? undefined :
            <Link to="/register" className="suluvir-login__registration-link">Not having an account? Register!</Link>;
        
        return (
            <div className="suluvir-login">
                <SmallLogoContainer>
                    {this.renderLoginForm()}
                    <hr/>
                    {this.renderGoogleLogin()}
                    <hr/>
                    {registationLink}
                </SmallLogoContainer>
            </div>
        );
    }
}
