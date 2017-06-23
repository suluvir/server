import Immutable from 'immutable';

import {postFile} from '../../utils/fetch';
import {getStore} from '../../utils/redux';

import {addToUploadPending, uploadDone} from '../../actions/uploadActions';

const MAX_PARALLEL_UPLOADS = 2;

export default class SongUploadQueue {
    constructor() {
        this.filesToUpload = new Immutable.List();
        this.uploadsInProgress = 0;

        this.checkForNewUpload = this.checkForNewUpload.bind(this);

        this.interval = setInterval(this.checkForNewUpload, 100);
    }

    addSongToUpload(file) {
        this.filesToUpload = this.filesToUpload.push(file);
        getStore().dispatch(addToUploadPending(file));
    }

    checkForNewUpload() {
        if (this.filesToUpload.size > 0 && this.uploadsInProgress < MAX_PARALLEL_UPLOADS) {
            this.uploadNextFile();
        }
    }

    uploadNextFile() {
        this.uploadsInProgress ++;
        const file = this.filesToUpload.last();
        this.filesToUpload = this.filesToUpload.pop();
        postFile('/api/internal/upload', file, 'media').then(song => {
            getStore().dispatch(uploadDone(song));
            this.uploadsInProgress --;
        });
    }
}

export const SONG_UPLOAD_QUEUE = new SongUploadQueue();