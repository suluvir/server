import React from 'react';
import Immutable from 'immutable';
import {ListItem, ListItemContent} from 'react-mdl';

export default class MySongListItem extends React.PureComponent {
    render() {
        const {song} = this.props;

        return (
            <ListItem>
                <ListItemContent>
                    {song.get('title')}
                </ListItemContent>
            </ListItem>
        );
    }
}

MySongListItem.propTypes = {
    song: React.PropTypes.instanceOf(Immutable.Map).isRequired
}