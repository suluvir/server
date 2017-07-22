import React from 'react';

import Page from '../pageFrame/Page';
import AlbumDetail from '../components/detail/AlbumDetail';

export default class MyAlbumsContainer extends React.PureComponent {
    render() {
        return <Page component={AlbumDetail} />
    }
}