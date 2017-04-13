import React from 'react';
import {Textfield, IconButton} from 'react-mdl';
import {connect} from 'react-redux';

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

    createPlaylist() {
        const {createPlaylist} = this.props;
        const {name} = this.state;

        if (name === '') {
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
                <Textfield 
                    className="suluvir-playlist-create__text-input"
                    floatingLabel
                    label="Create new playlist..."
                    onChange={event => this.setState({name: event.target.value})}
                    value={name}
                />
                <IconButton name="create" onClick={this.createPlaylist} />
            </div>
        );
    }
}

PlaylistCreateForm.propTypes = {
    createPlaylist: React.PropTypes.func.isRequired
}

export default connect(undefined, {createPlaylist})(PlaylistCreateForm);