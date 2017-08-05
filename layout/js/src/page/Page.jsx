import React from "react";
import {Layout, Header, Textfield, Content, Drawer, Navigation, Icon} from "react-mdl";
import SinglePageApplication from "./SinglePageApplication";
import {Link} from 'react-router';

require('./Page.scss');

export default class Page extends React.Component {
    constructor() {
        super();
        this.logout = this.logout.bind(this);
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
        }
    }

    render() {
        return (
            <div id="suluvir-root">
                <Layout fixedHeader fixedDrawer>
                    <Header title="Suluvir">
                        <Textfield
                            label="Search"
                            onChange={console.log}  // eslint-disable-line
                            expandable
                            expandableIcon="search"
                        />
                    </Header>
                    <Drawer title="Menu">
                        <Navigation>
                            <Link to="/"><Icon name="home"/> Home</Link>
                            <Link to="/artists"><Icon name="person"/> Artists</Link>
                            <Link to="/albums"><Icon name="album"/> Albums</Link>
                            <Link to="/songs"><Icon name="music_note"/> Songs</Link>
                            <Link to="/playlists"><Icon name="list"/> Playlists</Link>
                            <hr/>
                            <Link to="/upload"><Icon name="cloud_upload"/> Upload</Link>
                            <hr/>
                            <Link to="/profile"><Icon name="account_circle"/> Profile</Link>
                            <a onClick={this.logout} href="/logout"><Icon name="power_settings_new"/> Logout</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <SinglePageApplication component={this.props.component} {...this.props}/>
                    </Content>
                </Layout>
            </div>
        )
    }
}

Page.propTypes = {
    component: React.PropTypes.any.isRequired
}
