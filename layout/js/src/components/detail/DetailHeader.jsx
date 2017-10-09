import React from 'react';
import PropTypes from 'prop-types';

import {artistNameJoin} from '../../utils/formatters';

require('./DetailHeader.scss');

export default class DetailHeader extends React.PureComponent {
    getSongCount() {
        const {numberOfSongs} = this.props;
        if (numberOfSongs === 1) {
            return 'One song';
        }
        return `${numberOfSongs} songs`;
    }

    render() {
        const {artists, imgSrc, title, style, numberOfSongs} = this.props;
        const rootClassname = `suluvir-detail-header suluvir-detail-header--${style} mdc-elevation--z3`;
        const coverClassname = `suluvir-detail-header__cover suluvir-detail-header__cover--${style}`;
        const headerClassname = `suluvir-detail-header__header suluvir-detail-header__header--${style}`;

        const songCount = numberOfSongs ? ' - ' + this.getSongCount() : ''
        return (
            <div className={rootClassname}>
                <div className={coverClassname}>
                    <img src={imgSrc}/>
                </div>
                <div className={headerClassname}>
                    <h3>{title}</h3>
                    <div>{artistNameJoin(artists)}{songCount}</div>
                </div>
            </div>   
        );
    }
}

DetailHeader.propTypes = {
    artists: PropTypes.arrayOf(PropTypes.string).isRequired,
    imgSrc: PropTypes.string.isRequired,
    style: PropTypes.oneOf(['default', 'condensed']).isRequired,
    numberOfSongs: PropTypes.number,
    title: PropTypes.string.isRequired,
}

DetailHeader.defaultProps = {
    style: 'default'
}
