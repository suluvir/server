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

package tags

import (
	"github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/schema/media"
)

type extractionJob struct {
	user             *auth.User
	uploadedFilename string
	originalFilename string
	notifyChannel    chan *media.Song
}

var queues = map[string]chan extractionJob{}

// ExtractTagsSynchronously gets a song to analyze and does this in a synchronous manner per user
func ExtractTagsSynchronously(user *auth.User, uploadedFilename, originalFilename string) *media.Song {
	channel := getExtractionChannelForUser(user)
	notifyChannel := make(chan *media.Song, 1)

	channel <- extractionJob{
		user:             user,
		uploadedFilename: uploadedFilename,
		originalFilename: originalFilename,
		notifyChannel:    notifyChannel,
	}

	return <-notifyChannel
}

func getExtractionChannelForUser(user *auth.User) chan extractionJob {
	channel, ok := queues[user.ID]
	if ok {
		return channel
	}
	queues[user.ID] = make(chan extractionJob, 1)
	go extractionServiceForUser(user)
	return queues[user.ID]
}

func extractionServiceForUser(user *auth.User) {
	for job := range queues[user.ID] {
		executeJob(job)
	}
}

func executeJob(job extractionJob) {
	song, _ := ExtractTags(job.uploadedFilename, job.originalFilename, job.user)
	job.notifyChannel <- &song
}
