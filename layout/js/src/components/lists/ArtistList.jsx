import React from 'react';
import Immutable from 'immutable';
import {DataTable, TableHeader} from "react-mdl";

require('./ArtistList.scss');

export default class ArtistList extends React.Component {
    render() {
        return (
            <div className="suluvir-artist-list">
                <DataTable
                    sortable
                    shadow="3"
                    rows={this.props.artists.toJS()}
                >
                    <TableHeader name="name">Name</TableHeader>
                </DataTable>
            </div>
        );
    }
}

ArtistList.propTypes = {
    artists: React.PropTypes.instanceOf(Immutable.List).isRequired
};