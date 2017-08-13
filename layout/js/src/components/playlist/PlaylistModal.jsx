import React from 'react';
import Immutable from 'immutable';
import {
    List,
    ListItemAction,
    ListItemContent,
    ListItem,

    IconButton
} from 'react-mdl';
import {connect} from 'react-redux';

import Dialog from '../material/Dialog';

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
                const iconName = playlistContainsSong ? 'playlist_add_check' : 'playlist_add';
                const title = playlistContainsSong ? 'The song is already in this playlist' :
                    'Add the song to this playlist';

                playlistListItems.push(
                    <ListItem>
                        <ListItemContent>
                            {playlist.get('name')}
                        </ListItemContent>
                        <ListItemAction>
                            <IconButton
                                disabled={playlistContainsSong}
                                name={iconName} 
                                onClick={this.addSongToPlaylist(playlist)}
                                title={title}
                            />
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
                <Dialog show={show} onCancel={onCancel} title="Playlists">
                    <PlaylistCreateForm />
                    {playlistDisplay}
                </Dialog>
            </div>
        );
    }
}

PlaylistModal.propTypes = {
    addSongToPlaylist: React.PropTypes.func.isRequired,
    fetchMyPlaylists: React.PropTypes.func.isRequired,
    fetchPlaylistsOfSong: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func,
    playlists: React.PropTypes.instanceOf(Immutable.List).isRequired,
    playlistsOfSong: React.PropTypes.instanceOf(Immutable.Map),
    show: React.PropTypes.bool.isRequired,
    song: React.PropTypes.instanceOf(Immutable.Map).isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        playlists: state.myPlaylists,
        playlistsOfSong: state.playlistsOfSong.get(ownProps.song.get('@id'))
    }
}

export default connect(mapStateToProps, {fetchMyPlaylists, addSongToPlaylist, fetchPlaylistsOfSong})(PlaylistModal);