import React from 'react';
import Immutable from 'immutable';
import {
    Button, 
    Dialog, 
    DialogTitle, 
    DialogActions, 
    DialogContent,

    List,
    ListItemAction,
    ListItemContent,
    ListItem,

    IconButton
} from 'react-mdl';
import {connect} from 'react-redux';

import Loading from '../util/Loading';

import {fetchMyPlaylists} from '../../actions/thunkActions';

class PlaylistModal extends React.PureComponent {
    componentWillReceiveProps(newProps) {
        if (newProps.show === true && this.props.show === false) {
            this.props.fetchMyPlaylists();
        }
    }

    render()  {
        const {onCancel, show, playlists} = this.props;

        const playlistListItems = [];
        for (const playlist of playlists.toJS()) {
            playlistListItems.push(
                <ListItem>
                    <ListItemContent>
                        {playlist.name}
                    </ListItemContent>
                    <ListItemAction>
                        <IconButton name="playlist_add" />
                    </ListItemAction>
                </ListItem>
            );
        }
        
        const playlistList = (
            <List>
                {playlistListItems}
            </List>
        );

        return (
            <div>
                <Dialog open={show} onCancel={onCancel}>
                    <DialogTitle>Playlists</DialogTitle>
                    <DialogContent>
                        {playlistListItems.length === 0 ? <Loading /> : playlistList}
                    </DialogContent>
                    <DialogActions>
                        <Button type="button" onClick={onCancel}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PlaylistModal.propTypes = {
    fetchMyPlaylists: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func,
    playlists: React.PropTypes.instanceOf(Immutable.List).isRequired,
    show: React.PropTypes.bool.isRequired,
    song: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state) {
    return {
        playlists: state.myPlaylists
    }
}

export default connect(mapStateToProps, {fetchMyPlaylists})(PlaylistModal);