import React from 'react';

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
        const {artists, imgSrc, title, style} = this.props;
        const rootClassname = `suluvir-detail-header suluvir-detail-header--${style} mdc-elevation--z3`;
        const coverClassname = `suluvir-detail-header__cover suluvir-detail-header__cover--${style}`;
        const headerClassname = `suluvir-detail-header__header suluvir-detail-header__header--${style}`;
        return (
            <div className={rootClassname}>
                <div className={coverClassname}>
                    <img src={imgSrc}/>
                </div>
                <div className={headerClassname}>
                    <h3>{title}</h3>
                    <div>{artistNameJoin(artists)} - {this.getSongCount()}</div>
                </div>
            </div>   
        );
    }
}

DetailHeader.propTypes = {
    artists: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    imgSrc: React.PropTypes.string.isRequired,
    style: React.PropTypes.oneOf(['default', 'condensed']).isRequired,
    numberOfSongs: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
}

DetailHeader.defaultProps = {
    style: 'default'
}
