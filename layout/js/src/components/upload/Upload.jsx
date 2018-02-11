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
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';

import SongList from '../lists/SongList';
import PendingSongList from './PendingSongList';

import {setWindowTitle} from '../../utils/helpers';

import {SONG_UPLOAD_QUEUE} from '../../classes/upload/FileUploadQueue';

require('./Upload.scss');

class Upload extends React.PureComponent {
    constructor() {
        super();

        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(acceptedFiles) {
        acceptedFiles.forEach(acceptedFile => {
            SONG_UPLOAD_QUEUE.addSongToUpload(acceptedFile);
        })
    }

    componentWillMount() {
        setWindowTitle('Upload');
    }

    render() {
        return (
            <div className="suluvir-upload">
                <div className="suluvir-upload__dropzone-wrapper">
                    <Paper elevation={2}>
                        <Dropzone
                            accept="audio/mp3,audio/mpeg"
                            className="suluvir-upload__dropzone"
                            onDrop={this.handleDrop}
                        >
                            Drop some files here or click here to select the songs to upload.
                        </Dropzone>
                    </Paper>
                </div>
                <div className="suluvir-upload__pending-files">
                    <h3>Pending Songs</h3>
                    <PendingSongList pending={this.props.pending}/>
                </div>
                <div className="suluvir-upload__uploaded-songs">
                    <h3>Uploaded Songs</h3>
                    <SongList songs={this.props.uploaded}/>
                </div>
            </div>
        );
    }
}

Upload.propTypes = {
    pending: PropTypes.instanceOf(Immutable.List).isRequired,
    uploaded: PropTypes.instanceOf(Immutable.List).isRequired
};

function mapStateToProps(state) {
    return {
        pending: state.upload.get('pending'),
        uploaded: state.upload.get('uploaded')
    }
}

export default connect(mapStateToProps)(Upload);
