import React from 'react';
import {Route, Router, browserHistory} from 'react-router';

import {drawer} from 'material-components-web';

import Greeter from '../classes/Greeter';

import Page from './Page';
import RegistrationPage from './special/RegistrationPage';
import LoginPage from './special/LoginPage';

import Player from '../components/player/Player';
import NotificationList from '../components/notification/NotificationList';

import Overview from '../components/overview/Overview';
import Profile from '../components/profile/Profile';

import MySongList from '../components/lists/MySongList';
import MyAlbumList from '../components/lists/MyAlbumList';
import MyArtistList from '../components/lists/MyArtistList';
import MyPlaylistList from '../components/lists/MyPlaylistList';

import AlbumDetail from '../components/detail/AlbumDetail';
import ArtistDetail from '../components/detail/ArtistDetail';

import Upload from '../components/upload/Upload';

require('./RoutedPage.scss');

// mokey patch to stop full page reload when clicking on a link inside the drawer
// https://github.com/material-components/material-components-web/issues/1004#issuecomment-322924467
if (!drawer.MDCTemporaryDrawer.prototype.getDefaultFoundation_) {
    drawer.MDCTemporaryDrawer.prototype.getDefaultFoundation_ = drawer.MDCTemporaryDrawer.prototype.getDefaultFoundation;
    drawer.MDCTemporaryDrawer.prototype.getDefaultFoundation = function() {
      const foundation = this.getDefaultFoundation_();
  
      foundation.drawerClickHandler_ = (e) => {
        if (e.target.tagName !== 'A') {
          e.stopPropagation();
        }
      };
  
      return foundation;
    };
  }

function ComponentContainer(component) {
    return props => <Page component={component} {...props}/>;  // eslint-disable-line
}

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
                        <Route component={ComponentContainer(Overview)} path="/"/>

                        <Route component={RegistrationPage} path="register"/>
                        <Route component={LoginPage} path="login"/>

                        <Route component={ComponentContainer(Profile)} path="profile"/>

                        <Route component={ComponentContainer(MySongList)} path="songs"/>
                        <Route component={ComponentContainer(MyAlbumList)} path="albums"/>
                        <Route component={ComponentContainer(MyArtistList)} path="artists"/>
                        <Route component={ComponentContainer(MyPlaylistList)} path="playlists"/>

                        <Route component={ComponentContainer(AlbumDetail)} path="album/:albumId"/>
                        <Route component={ComponentContainer(ArtistDetail)} path="artist/:artistId"/>

                        <Route component={ComponentContainer(Upload)} path="upload"/>
                    </Router>
                    <Player />
                </div>
            </div>
        );
    }
}
