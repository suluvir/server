import * as React from "react";
import {Layout, Header, Textfield, Drawer, Content, Navigation} from "react-mdl";
import {Route, Router, browserHistory} from "react-router";
import SinglePageApplication from "./pageContents/SinglePageApplication";

require('./Page.scss');

export class Page extends React.Component<undefined, undefined> {
    static getRouter() {
        return (
            <Router history={browserHistory}>
                <Route component={SinglePageApplication} path="/"/>
            </Router>
        );
    }

    render() {
        return (
            <div id="suluvir-root">
                <Layout fixedHeader>
                    <Header title="Suluvir">
                        <Textfield
                            label="Search"
                            onChange={console.log}
                            expandable
                            expandableIcon="search"
                        />
                    </Header>
                    <Drawer>
                        <Navigation>
                            <a href="/">Link</a>
                        </Navigation>
                    </Drawer>
                    <Content>
                        <SinglePageApplication />
                    </Content>
                </Layout>
            </div>
        )
    }
}
