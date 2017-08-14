// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
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
	"github.com/ascherkus/go-id3/src/id3"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/schema/media"
	"go.uber.org/zap"
	"os"
	"regexp"
	"strconv"
	"strings"
)

// ExtractTags extracts tags and return appropriate structs. Only the primitive types are initialized, all others
// have to be set separately. Returns the song, all artists, the primary artist and the album
func ExtractTags(fileName string, originalFileName string, user *auth.User) (media.Song, error) {
	f, fErr := os.OpenFile(fileName, os.O_RDONLY, 0666)
	defer f.Close()
	id3File := id3.Read(f)
	if fErr != nil {
		logging.GetLogger().Error("error loading mp3 id3File", zap.Error(fErr))
		return media.Song{}, fErr
	}
	logging.GetLogger().Info("extracted information",
		zap.String("artist", id3File.Artist),
		zap.String("title", id3File.Name),
		zap.String("year", id3File.Year),
		zap.String("genre", id3File.Genre),
		zap.String("album", id3File.Album),
		zap.String("lengthMilliseconds", id3File.Length))

	artists := getArtistsByNames(id3File.Artist, user)
	album := getAlbumByName(id3File.Album, user)

	stat, statErr := f.Stat()
	if statErr != nil {
		logging.GetLogger().Error("error during id3File stat generation", zap.Error(statErr))
	}

	originalFileNameSplit := strings.Split(originalFileName, ".")
	extension := originalFileNameSplit[len(originalFileNameSplit)-1]

	track, trackErr := strconv.Atoi(id3File.Track)
	if trackErr != nil {
		track = 0
	}

	lengthMilliseconds, lengthErr := strconv.ParseFloat(id3File.Length, 64)
	if lengthErr != nil {
		lengthMilliseconds = 0
	}

	song := new(media.Song)
	song.Title = id3File.Name
	song.Artists = artists
	song.Album = album
	song.Track = track
	song.Type = extension
	song.Size = stat.Size()
	song.User = *user
	song.Duration = lengthMilliseconds / 1000

	return *song, nil
}

func getAlbumByName(albumName string, user *auth.User) media.Album {
	var album media.Album
	schema.GetDatabase().First(&album, "name = ? AND user_id = ?", albumName, user.ID)

	if album.Name == albumName {
		return album
	} else {
		album := media.Album{
			Name: albumName,
		}
		album.User = *user
		return album
	}
}

func getArtistsByNames(artistNames string, user *auth.User) []media.Artist {
	var artists []media.Artist
	var databaseArtist media.Artist

	artistNamesSplit := regexp.MustCompile("(;|,|feat\\.|ft\\.)").Split(artistNames, -1)
	for _, artistNameSplit := range artistNamesSplit {
		artistNameSplit := strings.Trim(artistNameSplit, " ")

		schema.GetDatabase().First(&databaseArtist, "name = ? AND user_id = ?", artistNameSplit, user.ID)

		if databaseArtist.Name == artistNameSplit {
			artists = append(artists, databaseArtist)
			logging.GetLogger().Info("use already existing artist",
				zap.String("name", databaseArtist.Name),
				zap.String("id", databaseArtist.ID))
		} else {
			logging.GetLogger().Debug("create new artist", zap.String("name", artistNameSplit))
			artist := media.Artist{Name: artistNameSplit}
			artist.User = *user
			artists = append(artists, artist)
		}
	}

	return artists
}
