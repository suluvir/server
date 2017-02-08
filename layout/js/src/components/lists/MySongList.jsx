import React from "react";
import Immutable from 'immutable';
import {connect} from "react-redux";
import {DataTable, TableHeader} from "react-mdl";

import {artistNameJoin, playButton} from '../../utils/formatters';
import {fetchMySongs} from "../../actions/thunkActions";

require('./MySongList.scss');

class MySongList extends React.PureComponent {
    render() {
        const {mySongs, fetchMySongs} = this.props;
        if (mySongs.size === 0) {
            fetchMySongs();
            return <div />
        }

        return (
            <div className={"suluvir-my-song-list"}>
                <DataTable
                    sortable
                    shadow="3"
                    rows={mySongs.toJS()}
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

MySongList.propTypes = {
    fetchMySongs: React.PropTypes.func.isRequired,
    mySongs: React.PropTypes.instanceOf(Immutable.List).isRequired
}

function mapStateToProps(state) {
    return {
        mySongs: state.mySongs
    }
}

export default connect(mapStateToProps, {fetchMySongs})(MySongList);