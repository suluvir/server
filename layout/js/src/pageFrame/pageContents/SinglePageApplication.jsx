import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
import {Tabs, Tab} from 'react-mdl';

import Player from '../../components/player/Player';
import MySongList from '../../components/lists/MySongList';
import MyArtistList from '../../components/lists/MyArtistList';
import MyAlbumList from '../../components/lists/MyAlbumList';

require('./SinglePageApplication.scss');

export default class SinglePageApplication extends React.PureComponent {
    constructor() {
        super();

        const tabs = ['/', '/artists', '/albums'];
        const activeTab = tabs.indexOf(window.location.pathname);
        this.state = {
            tabs,
            activeTab
        };
    }

    static getRouter() {
        return (
            <div className="suluvir-scroll-content">
                <Router history={browserHistory}>
                    <Route component={MySongList} path="/"/>
                    <Route component={MyArtistList} path="artists"/>
                    <Route component={MyAlbumList} path="albums"/>
                </Router>
            </div>
        );
    }

    getTabs() {
        return (
            <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                <Tab>Songs</Tab>
                <Tab>Artists</Tab>
                <Tab>Albums</Tab>
            </Tabs>
        );
    }

    componentWillUpdate(nextProps, nextState) {
        const newUrl = nextState.tabs[nextState.activeTab];
        browserHistory.push(newUrl);
    }

    render() {
        return (
            <div id="suluvir-spa">
                <div className="suluvir-content">
                    {this.getTabs()}
                    {SinglePageApplication.getRouter()}
                </div>
                <Player />
            </div>
        );
    }
}