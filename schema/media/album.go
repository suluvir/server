package media

import (
	"encoding/json"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/web/routeNames"
	"github.com/uber-go/zap"
	"strconv"
)

type Album struct {
	schema.DatabaseObject
	Name     string `json:"name"`
	ArtistID uint64 `json:"-"`
	Artist   Artist `json:"-"`
}

func init() {
	schema.AddSchema(&Album{})
}

type JsonAlbum Album

func (a *Album) GetApiLink() string {
	router := web.GetRouter()
	url, err := router.Get(routeNames.API_ALBUM).URL("id", strconv.FormatUint(a.ID, 10))

	if err != nil {
		logging.GetLogger().Error("error generating api url for album", zap.Uint64("id", a.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

func (a Album) MarshalJSON() ([]byte, error) {
	var artist Artist
	var songs []Song
	schema.GetDatabase().Model(&a).Related(&artist)
	schema.GetDatabase().Model(&a).Related(&songs)

	var songLinks = []string{}
	for _, song := range songs {
		songLinks = append(songLinks, song.GetApiLink())
	}

	return json.Marshal(struct {
		JsonAlbum
		ApiLink       string   `json:"@id"`
		ApiArtistLink string   `json:"@artist"`
		ApiSongLinks  []string `json:"@songs"`
	}{
		JsonAlbum:     JsonAlbum(a),
		ApiLink:       a.GetApiLink(),
		ApiArtistLink: artist.GetApiLink(),
		ApiSongLinks:  songLinks,
	})
}
