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

import React from "react";
import PropTypes from 'prop-types';
import SinglePageApplication from "./SinglePageApplication";
import {Link} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import MenuIcon from 'material-ui-icons/Menu';
import HomeIcon from 'material-ui-icons/Home';
import PersonIcon from 'material-ui-icons/Person';
import AlbumButton from 'material-ui-icons/Album';
import MusicNoteButton from 'material-ui-icons/MusicNote';
import ListIcon from 'material-ui-icons/List';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

require('./Page.scss');

export default class Page extends React.Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.openDrawer = this.openDrawer.bind(this);

        this.state = {
            drawer: false
        };
    }

    logout(e) {
        e.preventDefault();
        if (window.gapi !== undefined) {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init().then(() => {
                    const instance = window.gapi.auth2.getAuthInstance();
                    if (!instance.currentUser.get().isSignedIn()) {
                        // do not sign out the user if he isn't signed in
                        window.location.href = "/logout";
                        return;
                    }
                    instance.signOut().then(() => {
                        window.location.href = "/logout";
                        return;
                    });
                });
            });
        } else {
            window.location.replace('/logout');
        }
    }

    closeDrawer() {
        this.setState({drawer: false});
    }

    openDrawer() {
        this.setState({drawer: true});
    }

    render() {
        return (
            <div id="suluvir-root">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu" onClick={this.openDrawer}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography type="title" color="inherit">
                            Suluvir
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer open={this.state.drawer} onClose={this.closeDrawer}>
                    <List>
                        <Link to="/">
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home"/>
                            </ListItem>
                        </Link>
                        <Link to="/artists">
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Artists"/>
                            </ListItem>
                        </Link>
                        <Link to="/albums">
                            <ListItem button>
                                <ListItemIcon>
                                    <AlbumButton/>
                                </ListItemIcon>
                                <ListItemText primary="Albums"/>
                            </ListItem>
                        </Link>
                        <Link to="/songs">
                            <ListItem button>
                                <ListItemIcon>
                                    <MusicNoteButton/>
                                </ListItemIcon>
                                <ListItemText primary="Songs"/>
                            </ListItem>
                        </Link>
                        <Link to="/playlists">
                            <ListItem button>
                                <ListItemIcon>
                                    <ListIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Playlists"/>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider/>
                    <List>
                        <Link to="/profile">
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Profile"/>
                            </ListItem>
                        </Link>
                        <Link to="/upload">
                            <ListItem button>
                                <ListItemIcon>
                                    <CloudUploadIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Upload"/>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button component="a" href="/logout" onClick={this.logout}>
                            <ListItemIcon>
                                <PowerSettingsNewIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>

                <SinglePageApplication component={this.props.component} {...this.props}/>
            </div>
        )
    }
}

Page.propTypes = {
    component: PropTypes.any.isRequired
}
