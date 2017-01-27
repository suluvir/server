package media

import (
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web/routeNames"
	"strconv"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"github.com/suluvir/server/web"
	"encoding/json"
)

type Artist struct {
	schema.DatabaseObject
	Name string `json:"name"`
	Albums []Album `json:"-"`
}

func init() {
	schema.AddSchema(&Artist{})
}

type JsonArtist Artist

func (a *Artist) GetApiLink() string {
	router := web.GetRouter()
	url, err := router.Get(routeNames.API_ARTIST).URL("id", strconv.FormatUint(a.ID, 10))

	if err != nil {
		logging.GetLogger().Error("error generating api url for artist", zap.Uint64("id", a.ID), zap.Error(err))
		return ""
	}

	return url.String()
}

func (a Artist) MarshalJSON() ([]byte, error) {
	var albums []Album
	schema.GetDatabase().Model(&a).Related(&albums)

	var albumLinks = []string{}
	for _, album := range albums {
		albumLinks = append(albumLinks, album.GetApiLink())
	}

	return json.Marshal(struct {
		JsonArtist
		ApiLink string `json:"@id"`
		ApiAlbumLinks []string `json:"@albums"`
	}{
		JsonArtist: JsonArtist(a),
		ApiLink: a.GetApiLink(),
		ApiAlbumLinks: albumLinks,
	})
}
