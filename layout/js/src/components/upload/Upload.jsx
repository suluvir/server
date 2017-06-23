import React from 'react';
import Immutable from 'immutable';
import Dropzone from 'react-dropzone';

import SongList from '../lists/SongList';

import {SONG_UPLOAD_QUEUE} from '../../classes/upload/FileUploadQueue';

require('./Upload.scss');

export default class Upload extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            uploadedSongs: new Immutable.List()
        }

        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(acceptedFiles) {
        acceptedFiles.forEach(acceptedFile => {
            SONG_UPLOAD_QUEUE.addSongToUpload(acceptedFile);
        })
    }

    render() {
        return (
            <div className="suluvir-upload">
                <div className="suluvir-upload__dropzone">
                    <Dropzone 
                        accept="audio/mp3"
                        className="suluvir-upload__dropzone mdl-shadow--2dp"
                        onDrop={this.handleDrop}
                    >
                        Drop some files here or click here to select the songs to upload.
                    </Dropzone>
                </div>
                <div className="suluvir-upload__uploaded-songs">
                    <h3>Uploaded Songs</h3>
                    <SongList songs={this.state.uploadedSongs}/>
                </div>
            </div>
        );
    }
}