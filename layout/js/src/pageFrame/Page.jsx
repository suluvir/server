import React from "react";
import {Layout, Header, Textfield, Content} from "react-mdl";
import SinglePageApplication from "./pageContents/SinglePageApplication";

require('./Page.scss');

export class Page extends React.Component {
    render() {
        return (
            <div id="suluvir-root">
                <Layout fixedHeader>
                    <Header title="Suluvir">
                        <Textfield
                            label="Search"
                            onChange={console.log}  // eslint-disable-line
                            expandable
                            expandableIcon="search"
                        />
                    </Header>
                    <Content>
                        <SinglePageApplication />
                    </Content>
                </Layout>
            </div>
        )
    }
}