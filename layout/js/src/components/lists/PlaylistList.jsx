import React from 'react';
import Immutable from 'immutable';
import {DataTable, TableHeader} from "react-mdl";

require('./PlaylistList.scss');

export default class PlaylistList extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-playlist-list">
                <DataTable
                    sortable
                    shadow="3"
                    rows={this.props.playlists.toJS()}
                >
                    <TableHeader name="name">Name</TableHeader>
                </DataTable>
            </div>
        );
    }
}

PlaylistList.propTypes = {
    playlists: React.PropTypes.instanceOf(Immutable.List).isRequired
}