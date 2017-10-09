// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

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
