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
import PlaylistCreateForm from './PlaylistCreateForm';

import {fetchMyPlaylists, addSongToPlaylist} from '../../actions/thunkActions';

require('./PlaylistModal.scss');

class PlaylistModal extends React.PureComponent {
    componentWillReceiveProps(newProps) {
        if (newProps.show === true && this.props.show === false) {
            this.props.fetchMyPlaylists();
        }
    }

    render()  {
        const {onCancel, show, song, playlists, addSongToPlaylist} = this.props;

        const playlistListItems = [];
        let playlistDisplay;
        if (playlists !== null) {
            for (const playlist of playlists.toJS()) {
                playlistListItems.push(
                    <ListItem>
                        <ListItemContent>
                            {playlist.name}
                        </ListItemContent>
                        <ListItemAction>
                            <IconButton name="playlist_add" onClick={() => addSongToPlaylist(song, Immutable.fromJS(playlist))} />
                        </ListItemAction>
                    </ListItem>
                );
            }

            playlistDisplay = (
                <List className="suluvir-playlist__list">
                    {playlistListItems}
                </List>
            );
        } else {
            playlistDisplay = <Loading />;
        }

        return (
            <div>
                <Dialog open={show} onCancel={onCancel}>
                    <DialogTitle>Playlists</DialogTitle>
                    <DialogContent>
                        <PlaylistCreateForm />
                        {playlistDisplay}
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
    addSongToPlaylist: React.PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {fetchMyPlaylists, addSongToPlaylist})(PlaylistModal);