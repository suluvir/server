import * as React from 'react';
import {
    Layout,
    Header,
    Textfield,
    Drawer,
    Content,
    Navigation
} from 'react-mdl';

require('./Page.scss');

export class Page extends React.Component<undefined, undefined> {
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
                        content
                    </Content>
                </Layout>
            </div>
        )
    }
}
