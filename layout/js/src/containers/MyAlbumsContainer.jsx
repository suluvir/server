import React from 'react';

import Page from '../page/Page';
import MyAlbumList from '../components/lists/MyAlbumList';

export default class MyAlbumsContainer extends React.PureComponent {
    render() {
        return <Page component={MyAlbumList} />
    }
}
