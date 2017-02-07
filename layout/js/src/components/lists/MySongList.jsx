import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import {List} from 'react-mdl';

import {fetchMySongs} from '../../actions/thunkActions';
import MySongListItem from './MySongListItem';

require('./MySongList.scss');

class MySongList extends React.PureComponent {
    render() {
        const {mySongs, fetchMySongs} = this.props;
        if (mySongs.size === 0) {
            fetchMySongs();
            return <div />
        }

        let listItems = new Immutable.List();
        for (let song of mySongs) {
            listItems = listItems.push(
                <MySongListItem song={song} />
            );
        }

        return (
            <div className={"suluvir-my-song-list"}>
                <List>
                    {listItems}
                </List>
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