package tags

import (
	"github.com/mikkyang/id3-go"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/schema"
)

func ExtractTags(fileName string) media.Song {
	file, err := id3.Open(fileName)
	defer file.Close()
	if err != nil {
		logging.GetLogger().Error("error loading mp3 file for id extraction", zap.Error(err))
	}
	logging.GetLogger().Info("extracted information",
		zap.String("artist", file.Artist()),
		zap.String("title", file.Title()),
		zap.String("year", file.Year()),
		zap.String("genre", file.Genre()),
		zap.String("album", file.Album()))
	return media.Song{
		Title: file.Title(),
		Artists: getArtistsByNames(file.Artist()),
	}
}

func getArtistsByNames(artistNames string) []media.Artist {
	var artists []media.Artist

	var databaseArtist media.Artist
	schema.GetDatabase().First(&databaseArtist, "name = ?", artistNames)

	if databaseArtist.Name == artistNames {
		artists = append(artists, databaseArtist)
		logging.GetLogger().Info("use already existing artist",
			zap.String("name", databaseArtist.Name),
			zap.Uint("id", databaseArtist.ID))
	} else {
		logging.GetLogger().Debug("create new artist", zap.String("name", artistNames))
		artists = append(artists, media.Artist{Name:artistNames})
	}

	return artists
}
