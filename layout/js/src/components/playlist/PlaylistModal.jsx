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
import {connect} from 'react-redux';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import List, {ListItem, ListItemSecondaryAction, ListItemText} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck';
import PlaylistAddIcon from 'material-ui-icons/PlaylistAdd';

import Loading from '../util/Loading';
import PlaylistCreateForm from './PlaylistCreateForm';

import {fetchMyPlaylists, addSongToPlaylist, fetchPlaylistsOfSong} from '../../actions/thunkActions';

require('./PlaylistModal.scss');

class PlaylistModal extends React.PureComponent {
    constructor() {
        super();

        this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    }

    addSongToPlaylist(playlist) {
        const {song, addSongToPlaylist, fetchPlaylistsOfSong} = this.props;

        return () => {
            addSongToPlaylist(song, playlist).then(() => {
                fetchPlaylistsOfSong(song);
            });

        };
    }

    componentWillReceiveProps(newProps) {
        const {fetchMyPlaylists, fetchPlaylistsOfSong, show, song} = this.props;
        if (newProps.show === true && show === false) {
            fetchMyPlaylists();
            fetchPlaylistsOfSong(song);
        }
    }

    render()  {
        const {onCancel, show, playlists, playlistsOfSong} = this.props;

        const playlistListItems = [];
        let playlistDisplay;
        if (playlists !== null) {
            for (const playlist of playlists.toArray()) {
                const playlistContainsSong = playlistsOfSong !== undefined &&
                    playlistsOfSong.get(playlist.get('@id')) === true;
                const title = playlistContainsSong ? 'The song is already in this playlist' :
                    'Add the song to this playlist';
                const icon = playlistContainsSong ? <PlaylistAddCheckIcon/> : <PlaylistAddIcon/>;

                playlistListItems.push(
                    <ListItem>
                        <ListItemText primary={playlist.get('name')}/>
                        <ListItemSecondaryAction>
                            <IconButton
                                disabled={playlistContainsSong}
                                onClick={this.addSongToPlaylist(playlist)}
                                title={title}
                            >
                                {icon}
                            </IconButton>
                        </ListItemSecondaryAction>
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
                <Dialog
                    open={show}
                    onClose={onCancel}
                >
                    <DialogTitle>Playlists</DialogTitle>
                    <DialogContent>
                        <PlaylistCreateForm />
                        {playlistDisplay}
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" raised onClick={onCancel}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PlaylistModal.propTypes = {
    addSongToPlaylist: PropTypes.func.isRequired,
    fetchMyPlaylists: PropTypes.func.isRequired,
    fetchPlaylistsOfSong: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    playlists: PropTypes.instanceOf(Immutable.List).isRequired,
    playlistsOfSong: PropTypes.instanceOf(Immutable.Map),
    show: PropTypes.bool.isRequired,
    song: PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        playlists: state.myPlaylists,
        playlistsOfSong: state.playlistsOfSong.get(ownProps.song.get('@id'))
    }
}

export default connect(mapStateToProps, {fetchMyPlaylists, addSongToPlaylist, fetchPlaylistsOfSong})(PlaylistModal);