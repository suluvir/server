import React from 'react';

import Page from '../page/Page';
import MySongList from '../components/lists/MySongList';

export default class MySongsContainer extends React.PureComponent {
    render() {
        return <Page component={MySongList} />
    }
}
