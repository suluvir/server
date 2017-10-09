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
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {connect} from 'react-redux';

import {List, ListItem, ListItemContent, ProgressBar} from 'react-mdl';

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

    render() {
        const {user} = this.props;
        return (
            <div className="suluvir-profile">
                <h1>Profile</h1>

                <List>
                    <ListItem twoLine>
                        <ListItemContent avatar="person_outline" subtitle="Username">{user.get('username')}</ListItemContent>
                    </ListItem>
                    <ListItem twoLine>
                        <ListItemContent avatar="mail_outline" subtitle="E-Mail">{user.get('email')}</ListItemContent>
                    </ListItem>
                </List>

                <hr/>

                <h2>Quota</h2>

                Songs ({this.getQuotaSongDisplay()}):
                <ProgressBar progress={this.getQuotaSongPercentage()} />

                Space ({this.getQuotaSpaceDisplay()}):
                <ProgressBar progress={this.getQuotaSpacePercentage()} />
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
