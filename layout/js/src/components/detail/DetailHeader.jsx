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

import Paper from 'material-ui/Paper';

import OverlayPlayButton from '../util/OverlayPlayButton';

require('./DetailHeader.scss');

export default class DetailHeader extends React.PureComponent {
    render() {
        const {imgSrc, title, style, subTexts, collection} = this.props;
        const rootClassname = `suluvir-detail-header suluvir-detail-header--${style}`;
        const coverClassname = `suluvir-detail-header__cover suluvir-detail-header__cover--${style}`;
        const headerClassname = `suluvir-detail-header__header suluvir-detail-header__header--${style}`;
        return (
            <Paper elevation={3}>
                <div className={rootClassname}>
                    <div className={coverClassname}>
                        <img src={imgSrc}/>
                        <OverlayPlayButton collection={collection}/>
                    </div>
                    <div className={headerClassname}>
                        <h3>{title}</h3>
                        <div>{subTexts.join(' - ')}</div>
                    </div>
                </div>
            </Paper>
        );
    }
}

DetailHeader.propTypes = {
    collection: PropTypes.instanceOf(Immutable.Map).isRequired,
    imgSrc: PropTypes.string.isRequired,
    style: PropTypes.oneOf(['default', 'condensed']).isRequired,
    title: PropTypes.string.isRequired,
    subTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
}

DetailHeader.defaultProps = {
    style: 'default'
}
