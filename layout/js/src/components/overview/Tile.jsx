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

import {Link} from 'react-router-dom';

import Paper from 'material-ui/Paper';

import OverlayPlayButton from '../util/OverlayPlayButton';

require('./Tile.scss');

export default class Tile extends React.PureComponent {
    render() {
        const {collection} = this.props;
        return (
            <Paper>
                <div className="suluvir-home-tile">
                    <div className="suluvir-home-tile__image">
                        <img alt="" src={collection.get('@cover')}/>
                        <OverlayPlayButton collection={collection}/>
                    </div>
                    <div className="suluvir-home-tile__title">
                        <Link to={collection.get('@ui')}>
                            {collection.get('name')}
                        </Link>
                    </div>
                </div>
            </Paper>
        );
    }
}

Tile.propTypes = {
    collection: PropTypes.instanceOf(Immutable.Map).isRequired
};
