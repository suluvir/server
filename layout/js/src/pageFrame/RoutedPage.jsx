import React from 'react';
import {Route, Router, browserHistory} from 'react-router';

import Player from '../components/player/Player';

import MySongsContainer from '../containers/MySongsContainer';
import MyArtistsContainer from '../containers/MyArtistsContainer';
import MyAlbumsContainer from '../containers/MyAlbumsContainer';

require('./RoutedPage.scss');

export default class RoutedPage extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-routed-page">
                <Router history={browserHistory}>
                    <Route component={MySongsContainer} path="songs"/>
                    <Route component={MyAlbumsContainer} path="albums"/>
                    <Route component={MyArtistsContainer} path="artists"/>
                </Router>
                <Player />
            </div>
        );
    }
}
