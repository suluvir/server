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
	"github.com/mikkyang/id3-go"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/auth"
	"github.com/suluvir/server/schema/media"
	"go.uber.org/zap"
	"os"
	"regexp"
	"strings"
)

// ExtractTags extracts tags and return appropriate structs. Only the primitive types are initialized, all others
// have to be set separately. Returns the song, all artists, the primary artist and the album
func ExtractTags(fileName string, originalFileName string, user *auth.User) (media.Song, error) {
	file, idErr := id3.Open(fileName)
	f, fErr := os.OpenFile(fileName, os.O_RDONLY, 0666)
	defer f.Close()
	defer file.Close()
	if fErr != nil {
		logging.GetLogger().Error("error loading mp3 file", zap.Error(fErr))
		return media.Song{}, fErr
	}
	if idErr != nil {
		logging.GetLogger().Error("error loading mp3 file for id extraction", zap.Error(idErr))
		return media.Song{}, idErr
	}
	logging.GetLogger().Info("extracted information",
		zap.String("artist", file.Artist()),
		zap.String("title", file.Title()),
		zap.String("year", file.Year()),
		zap.String("genre", file.Genre()),
		zap.String("album", file.Album()))

	artists := getArtistsByNames(file.Artist(), user)
	album := getAlbumByName(file.Album(), user)

	stat, statErr := f.Stat()
	if statErr != nil {
		logging.GetLogger().Error("error during file stat generation", zap.Error(statErr))
	}

	originalFileNameSplit := strings.Split(originalFileName, ".")
	extension := originalFileNameSplit[len(originalFileNameSplit)-1]

	song := new(media.Song)
	song.Title = file.Title()
	song.Artists = artists
	song.Album = album
	song.Type = extension
	song.Size = stat.Size()
	song.User = *user

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
