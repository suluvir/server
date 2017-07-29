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
        const {artists, imgSrc, title} = this.props;
        return (
            <div className="suluvir-detail-header mdl-shadow--3dp">
                <div className="suluvir-detail-header__cover">
                    <img src={imgSrc}/>
                </div>
                <div className="suluvir-detail-header__header">
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
    numberOfSongs: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
}
