import React from 'react';
import Immutable from 'immutable';
import {DataTable, TableHeader} from "react-mdl";

import {artistNameJoin, playButton} from '../../utils/formatters';

require('./SongList.scss');

export default class SongList extends React.Component {
    render() {
        return (
            <div className={"suluvir-song-list"}>
                <DataTable
                    sortable
                    shadow="3"
                    rows={this.props.songs.toJS()}
                >
                    <TableHeader name="@id" cellFormatter={playButton} />
                    <TableHeader name="title">Title</TableHeader>
                    <TableHeader name="artist_names" cellFormatter={artistNameJoin}>Artist</TableHeader>
                    <TableHeader name="duration">Duration</TableHeader>
                </DataTable>
            </div>
        );
    }
}

SongList.propTypes = {
    songs: React.PropTypes.instanceOf(Immutable.List).isRequired
};