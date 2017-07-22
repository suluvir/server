import React from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {fetchObject} from '../../actions/fetchActions';

class AlbumDetail extends React.PureComponent {
    getApiLink() {
        const {params} = this.props;
        return `/api/v1/album/${params.albumId}`;
    }

    render() {
        const {album, fetchObject} = this.props;

        if (album === undefined) {
            fetchObject(this.getApiLink());
            return <div/>
        }

        return (
            <div>
                {album.get('name')}
            </div>
        );
    }
}

AlbumDetail.propTypes = {
    album: React.PropTypes.instanceOf(Immutable.Map),
    fetchObject: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    const id = `/api/v1/album/${ownProps.params.albumId}`
    return {
        album: state.objectsById.get(id)
    }
}

export default connect(mapStateToProps, {fetchObject})(AlbumDetail);