import React from 'react';

import Page from '../pageFrame/Page';
import Profile from '../components/profile/Profile';

export default class ProfileContainer extends React.PureComponent {
    render() {
        return <Page component={Profile} />
    }
}
