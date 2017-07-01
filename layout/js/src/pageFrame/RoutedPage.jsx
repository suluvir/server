import React from 'react';
import {Route, Router, browserHistory} from 'react-router';

import Greeter from '../classes/Greeter';

import Player from '../components/player/Player';

import RegistrationPage from './special/RegistrationPage';
import LoginPage from './special/LoginPage';

import UploadPage from '../containers/UploadPage';

import ProfileContainer from '../containers/ProfileContainer';

import StartpageContainer from '../containers/StartpageContainer';
import MySongsContainer from '../containers/MySongsContainer';
import MyArtistsContainer from '../containers/MyArtistsContainer';
import MyAlbumsContainer from '../containers/MyAlbumsContainer';
import MyPlaylistsContainer from '../containers/MyPlaylistsContainer';

import NotificationList from '../components/notification/NotificationList';

require('./RoutedPage.scss');

export default class RoutedPage extends React.PureComponent {
    constructor() {
        super();

        this.greeter = new Greeter();
    }

    render() {
        return (
            <div className="suluvir">
                <div>
                    <NotificationList/>
                </div>
                <div className="suluvir-routed-page">
                    <Router history={browserHistory}>
                        <Route component={StartpageContainer} path="/"/>

                        <Route component={RegistrationPage} path="register"/>
                        <Route component={LoginPage} path="login"/>

                        <Route component={ProfileContainer} path="profile"/>

                        <Route component={MySongsContainer} path="songs"/>
                        <Route component={MyAlbumsContainer} path="albums"/>
                        <Route component={MyArtistsContainer} path="artists"/>
                        <Route component={MyPlaylistsContainer} path="playlists"/>

                        <Route component={UploadPage} path="upload"/>
                    </Router>
                    <Player />
                </div>
            </div>
        );
    }
}
