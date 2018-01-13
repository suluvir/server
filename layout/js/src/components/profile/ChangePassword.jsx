// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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

import {postJson} from '../../utils/fetch';

import Button from 'material-ui/Button';

import Dialog from '../material/Dialog';
import Textfield from '../material/Textfield';

export default class ChangePassword extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            showModal: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.clearInputs = this.clearInputs.bind(this);
    }

    showModal() {
        this.setState({showModal: true});
    }

    hideModal() {
        this.setState({showModal: false});
    }

    clearInputs() {
        this.setState({
            old_pw: '',
            new_pw: '',
            new_pw_repeat: ''
        });
    }

    changePassword() {
        const {old_pw, new_pw, new_pw_repeat} = this.state;
        const payload = {
            old_pw, new_pw, new_pw_repeat
        };
        postJson('/api/internal/user/changepwd', payload).then(this.clearInputs);
    }

    onInputChange(stateKey) {
        return event => {
            this.setState({[stateKey]: event.target.value});
        }
    }

    renderDialog() {
        return (
            <Dialog
                show={this.state.showModal}
                title="Change Password"
                onHide={this.hideModal}
                onSubmit={this.changePassword}
            >
                <form onSubmit={this.changePassword}>
                    <div>
                        <Textfield
                            label="Old password"
                            autoFocus
                            type="password"
                            onChange={this.onInputChange('old_pw')}
                        />
                        <Textfield
                            label="New password"
                            type="password"
                            onChange={this.onInputChange('new_pw')}
                        />
                        <Textfield
                            label="New password (repeat)"
                            type="password"
                            onChange={this.onInputChange('new_pw_repeat')}
                        />
                    </div>
                </form>
            </Dialog>
        );
    }

    render() {
        return (
            <div>
                {this.renderDialog()}
                <Button raised onClick={this.showModal}>
                    Change password
                </Button>
            </div>
        );
    }
}