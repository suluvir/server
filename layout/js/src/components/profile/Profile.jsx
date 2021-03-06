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
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';

import List, {ListItem, ListItemText} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {LinearProgress} from 'material-ui/Progress';

import PersonOutlineIcon from 'material-ui-icons/PersonOutline';
import MailOutlineIcon from 'material-ui-icons/MailOutline';

import ChangePassword from './ChangePassword';

import {fetchUser} from '../../actions/thunkActions';

import {formatBytes} from '../../utils/formatters';
import {setWindowTitle} from '../../utils/helpers';

class Profile extends React.PureComponent {
    getQuotaSpacePercentage() {
        const {user} = this.props;
        return 100 - (user.get('available_quota_space') / user.get('quota_space') * 100);
    }

    getQuotaSongPercentage() {
        const {user} = this.props;
        return 100 - (user.get('available_quota_songs') / user.get('quota_songs') * 100);
    }

    getQuotaSongDisplay() {
        const {user} = this.props;
        const available = user.get('quota_songs') - user.get('available_quota_songs');
        return `${available} / ${user.get('quota_songs')}`;
    }

    getQuotaSpaceDisplay() {
        const {user} = this.props;
        const available = user.get('quota_space') - user.get('available_quota_space');
        return `${formatBytes(available)} / ${formatBytes(user.get('quota_space'))}`;
    }

    componentWillMount() {
        this.props.fetchUser();
        setWindowTitle('My profile');
    }

    canChangePassword() {
        const {user} = this.props;
        return user !== undefined && user.get('auth_provider') === 'suluvir';
    }

    render() {
        const {user} = this.props;
        return (
            <div className="suluvir-profile">
                <h1>Profile</h1>

                <List>
                    <ListItem button>
                        <Avatar>
                            <PersonOutlineIcon/>
                        </Avatar>
                        <ListItemText primary="Username" secondary={user.get('username')}/>
                    </ListItem>
                    <ListItem button>
                        <Avatar>
                            <MailOutlineIcon/>
                        </Avatar>
                        <ListItemText primary="E-Mail" secondary={user.get('email')} />
                    </ListItem>
                </List>

                <hr/>

                {this.canChangePassword() ? <ChangePassword/> : undefined}

                {this.canChangePassword() ? <hr/> : undefined}

                <h2>Quota</h2>

                Songs ({this.getQuotaSongDisplay()}):
                <LinearProgress mode="determinate" value={this.getQuotaSongPercentage()} />

                Space ({this.getQuotaSpaceDisplay()}):
                <LinearProgress mode="determinate" value={this.getQuotaSpacePercentage()} />
            </div>
        );
    }
}

Profile.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {fetchUser})(Profile);
