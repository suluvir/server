// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import PlayCollectionButton from '../player/PlayCollectionButton';

require('./OverlayPlayButton.scss');

export default class OverlayPlayButton extends React.PureComponent {
    render() {
        return (
            <div className="suluvir-overlay-play-button">
                <PlayCollectionButton collection={this.props.collection}/>
            </div>
        );
    }
}

OverlayPlayButton.propTypes = {
    collection: PropTypes.instanceOf(Immutable.Map).isRequired,
};
