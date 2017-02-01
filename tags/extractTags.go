package tags

import (
	"github.com/mikkyang/id3-go"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
	"github.com/uber-go/zap"
	"regexp"
	"strings"
)

// Extract tags and return appropriate structs. Only the primitive types are initialized, all others
// have to be set separately. Returns the song, all artists, the primary artist and the album
func ExtractTags(fileName string) (media.Song, error) {
	file, err := id3.Open(fileName)
	defer file.Close()
	if err != nil {
		logging.GetLogger().Error("error loading mp3 file for id extraction", zap.Error(err))
		return media.Song{}, err
	}
	logging.GetLogger().Info("extracted information",
		zap.String("artist", file.Artist()),
		zap.String("title", file.Title()),
		zap.String("year", file.Year()),
		zap.String("genre", file.Genre()),
		zap.String("album", file.Album()))

	artists := getArtistsByNames(file.Artist())
	album := getAlbumByName(file.Album())
	song := media.Song{
		Title:   file.Title(),
		Artists: artists,
		Album:   album,
	}

	return song, nil
}

func getAlbumByName(albumName string) media.Album {
	var album media.Album
	schema.GetDatabase().First(&album, "name = ?", albumName)

	if album.Name == albumName {
		return album
	} else {
		return media.Album{
			Name: albumName,
		}
	}
}

func getArtistsByNames(artistNames string) []media.Artist {
	var artists []media.Artist
	var databaseArtist media.Artist

	artistNamesSplit := regexp.MustCompile("(,|feat\\.|ft.)").Split(artistNames, -1)
	for _, artistNameSplit := range artistNamesSplit {
		artistNameSplit := strings.Trim(artistNameSplit, " ")

		schema.GetDatabase().First(&databaseArtist, "name = ?", artistNameSplit)

		if databaseArtist.Name == artistNameSplit {
			artists = append(artists, databaseArtist)
			logging.GetLogger().Info("use already existing artist",
				zap.String("name", databaseArtist.Name),
				zap.Uint64("id", databaseArtist.ID))
		} else {
			logging.GetLogger().Debug("create new artist", zap.String("name", artistNameSplit))
			artists = append(artists, media.Artist{Name: artistNameSplit})
		}
	}

	return artists
}
