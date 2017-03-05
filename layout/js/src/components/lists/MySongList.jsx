import React from "react";
import Immutable from 'immutable';
import {connect} from "react-redux";

import SongList from './SongList';
import Loading from '../util/Loading';
import {fetchMySongs} from "../../actions/thunkActions";

class MySongList extends React.PureComponent {
    render() {
        const {mySongs, fetchMySongs} = this.props;
        if (mySongs.size === 0) {
            fetchMySongs();
            return <Loading />;
        }

        return (
            <div className={"suluvir-my-song-list"}>
                <SongList songs={mySongs} />
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