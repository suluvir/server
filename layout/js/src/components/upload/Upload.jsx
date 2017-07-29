import React from 'react';
import Immutable from 'immutable';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';

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
                    <Dropzone 
                        accept="audio/mp3"
                        className="suluvir-upload__dropzone mdl-shadow--2dp"
                        onDrop={this.handleDrop}
                    >
                        Drop some files here or click here to select the songs to upload.
                    </Dropzone>
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
    pending: React.PropTypes.instanceOf(Immutable.List).isRequired,
    uploaded: React.PropTypes.instanceOf(Immutable.List).isRequired
};

function mapStateToProps(state) {
    return {
        pending: state.upload.get('pending'),
        uploaded: state.upload.get('uploaded')
    }
}

export default connect(mapStateToProps)(Upload);
