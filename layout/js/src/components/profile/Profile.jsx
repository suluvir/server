import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';

import {List, ListItem, ListItemContent} from 'react-mdl';

import {fetchUser} from '../../actions/thunkActions';

class Profile extends React.PureComponent {
    componentWillMount() {
        this.props.fetchUser();
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
