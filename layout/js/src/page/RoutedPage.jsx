// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

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
import PlaylistDetail from '../components/detail/PlaylistDetail';

import Upload from '../components/upload/Upload';

require('./RoutedPage.scss');

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
                    <BrowserRouter>
                        <div className="suluvir-router-wrapper">
                            <Route component={ComponentContainer(Overview)} path="/" exact />

                            <Route component={RegistrationPage} path="/register"/>
                            <Route component={LoginPage} path="/login"/>

                            <Route component={ComponentContainer(Profile)} path="/profile"/>

                            <Route component={ComponentContainer(MySongList)} path="/songs"/>
                            <Route component={ComponentContainer(MyAlbumList)} path="/albums"/>
                            <Route component={ComponentContainer(MyArtistList)} path="/artists"/>
                            <Route component={ComponentContainer(MyPlaylistList)} path="/playlists"/>

                            <Route component={ComponentContainer(AlbumDetail)} path="/album/:albumId"/>
                            <Route component={ComponentContainer(ArtistDetail)} path="/artist/:artistId"/>
                            <Route component={ComponentContainer(PlaylistDetail)} path="/playlist/:playlistId"/>

                            <Route component={ComponentContainer(Upload)} path="/upload"/>
                        </div>
                    </BrowserRouter>
                    <Player />
                </div>
            </div>
        );
    }
}
