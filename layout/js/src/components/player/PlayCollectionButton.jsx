import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {IconButton} from 'react-mdl';
import {connect} from 'react-redux';

import {playCollection} from '../../actions/thunkActions';

class PlayCollectionButton extends React.PureComponent {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {playCollection, collection} = this.props;
        playCollection(collection);
    }

    render() {
        return (
            <IconButton name="play_circle_outline" onClick={this.onClick} />
        );
    }
}

PlayCollectionButton.propTypes = {
    collection: PropTypes.instanceOf(Immutable.Map).isRequired,
    playCollection: PropTypes.func.isRequired
}

export default connect(undefined, {playCollection})(PlayCollectionButton);