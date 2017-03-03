import React from 'react';
import {Route, Router, browserHistory} from 'react-router';
import {Tabs, Tab} from 'react-mdl';

import Player from '../../components/player/Player';
import MySongList from '../../components/lists/MySongList';
import MyArtistList from '../../components/lists/MyArtistList';

require('./SinglePageApplication.scss');

export default class SinglePageApplication extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            tabs: ['/', '/artists'],
            activeTab: 0
        };
    }

    static getRouter() {
        return (
            <Router history={browserHistory}>
                <Route component={MySongList} path="/"/>
                <Route component={MyArtistList} path="artists"/>
            </Router>
        );
    }

    getTabs() {
        return (
            <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                <Tab>Songs</Tab>
                <Tab>Artists</Tab>
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