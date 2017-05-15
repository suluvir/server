import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-mdl';
import {Link} from 'react-router';

import {postJson} from '../../utils/fetch';
import {addError} from '../../actions/errorActions';

import SmallLogoContainer from '../../containers/SmallLogoContainer';
import IconTextfield from '../../components/util/IconTextfield';

require('./LoginPage.scss');

class LoginPage extends React.PureComponent {
    constructor() {
        super();

        this.state = {};
        this.login = this.login.bind(this);
    }

    onInputChange(stateKey) {
        return event => {
            this.setState({[stateKey]: event.target.value});
        }
    }

    login(event) {
        const {addError} = this.props;
        const {login, password} = this.state;

        event.preventDefault();
        
        postJson('/api/internal/user/login', {login, password}).then(() => {
            window.location.href = '/';
        }).catch(error => {
            error.json().then(err => {
                addError(err);
            })
        });
    }

    render() {
        return (
            <div className="suluvir-login">
                <SmallLogoContainer>
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

                        <Link to="/register" className="suluvir-login__registration-link">Not having an account? Register!</Link>
                    </form>
                </SmallLogoContainer>
            </div>
        );
    }
}

LoginPage.propTypes = {
    addError: React.PropTypes.func.isRequired
}

export default connect(undefined, {addError})(LoginPage);
