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
import {connect} from 'react-redux';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui-icons/Add';

import {createPlaylist} from '../../actions/thunkActions';

require('./PlaylistCreateForm.scss');

class PlaylistCreateForm extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            name: ''
        };

        this.createPlaylist = this.createPlaylist.bind(this);
    }

    isNameSet() {
        const {name} = this.state;
        return name.length !== 0 && name.trim().length !== 0;
    }

    createPlaylist(event) {
        if (event !== undefined) {
            event.preventDefault();
        }
        const {createPlaylist} = this.props;
        const {name} = this.state;

        if (!this.isNameSet()) {
            // don't create playlists with empty names
            return;
        }

        createPlaylist(name).then(() => {
            this.setState({name: ''});
        });
    }

    render() {
        const {name} = this.state;

        return (
            <div className="suluvir__playlist-create">
                <form onSubmit={this.createPlaylist}>
                    <TextField
                        className="suluvir-playlist-create__text-input"
                        label="Create new playlist..."
                        onChange={event => this.setState({name: event.target.value})}
                        value={name}
                    />
                </form>
                <IconButton
                    color="primary"
                    disabled={!this.isNameSet()}
                    onClick={this.createPlaylist}
                    title="Create new playlist"
                >
                    <AddIcon/>
                </IconButton>
            </div>
        );
    }
}

PlaylistCreateForm.propTypes = {
    createPlaylist: PropTypes.func.isRequired
}

export default connect(undefined, {createPlaylist})(PlaylistCreateForm);