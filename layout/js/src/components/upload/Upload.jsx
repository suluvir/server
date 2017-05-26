import React from 'react';
import Dropzone from 'react-dropzone';

require('./Upload.scss');

export default class Upload extends React.PureComponent {
    constructor() {
        super();

        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(acceptedFiles, rejectedFiles) {
        this.setState({
            acceptedFiles,
            rejectedFiles
        });
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
            </div>
        );
    }
}