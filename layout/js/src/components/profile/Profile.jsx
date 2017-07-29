import React from 'react';
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
    fetchUser: React.PropTypes.func.isRequired,
    user: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, {fetchUser})(Profile);
