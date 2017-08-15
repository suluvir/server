import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';

import {fetchObject} from '../../actions/fetchActions';

import AlbumDetail from './AlbumDetail';
import DetailHeader from './DetailHeader';

require('./ArtistDetail.scss');

function getApiLink(id) {
    return `/api/v1/artist/${id}`;
}

class ArtistDetail extends React.PureComponent {
    getApiLink() {
        const {params} = this.props;
        return getApiLink(params.artistId);
    }

    render() {
        const {artist, fetchObject} = this.props;
        if (artist === undefined) {
            fetchObject(this.getApiLink());
            return <div/>;
        }

        const albumDetails = artist.get('@albums').map(a => {
            return (
                <div className="suluvir-artist-details__album">
                    <AlbumDetail
                        albumLink={a}
                        style="condensed"
                    />
                </div>
            );
        })

        return (
            <div className="suluvir-artist-details">
                <div className="suluvir-artist-details__header">
                    <DetailHeader
                        artists={[]}
                        imgSrc={artist.get('@cover')}
                        title={artist.get('name')}
                    />
                </div>
                <div className="suluvir-artist-details__albums">
                    {albumDetails}
                </div>
            </div>
        );
    }
}

ArtistDetail.propTypes = {
    artist: React.PropTypes.instanceOf(Immutable.Map),
    albums: React.PropTypes.instanceOf(Immutable.List).isRequired,
    fetchObject: React.PropTypes.func.isRequired,
    params: React.PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
    const url = getApiLink(ownProps.params.artistId);
    return {
        artist:  state.urlCache.get(url)
    }
}

export default connect(mapStateToProps, {fetchObject})(ArtistDetail);
