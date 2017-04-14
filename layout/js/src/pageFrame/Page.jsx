import React from "react";
import {Layout, Header, Textfield, Content, Drawer, Navigation, Icon} from "react-mdl";
import SinglePageApplication from "./pageContents/SinglePageApplication";
import {Link} from 'react-router';

require('./Page.scss');

export default class Page extends React.Component {
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
                        </Navigation>
                    </Drawer>
                    <Content>
                        <SinglePageApplication component={this.props.component} />
                    </Content>
                </Layout>
            </div>
        )
    }
}

Page.propTypes = {
    component: React.PropTypes.any.isRequired
}
