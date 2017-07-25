import React from 'react';

import Page from '../page/Page';
import MyArtistList from '../components/lists/MyArtistList';

export default class MyArtistsContainer extends React.PureComponent {
    render() {
        return <Page component={MyArtistList} />
    }
}
