import React from 'react';
import Immutable from 'immutable';
import {DataTable, TableHeader} from "react-mdl";

require('./AlbumList.scss');

export default class AlbumList extends React.Component {
    render() {
        return (
            <div className="suluvir-artist-list">
                <DataTable
                    sortable
                    shadow="3"
                    rows={this.props.albums.toJS()}
                >
                    <TableHeader name="name">Name</TableHeader>
                </DataTable>
            </div>
        );
    }
}

AlbumList.propTypes = {
    albums: React.PropTypes.instanceOf(Immutable.List).isRequired
};