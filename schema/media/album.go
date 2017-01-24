package media

import (
	"github.com/suluvir/server/schema"
)

type Album struct {
	schema.DatabaseObject
	Name string `json:"name"`
	ArtistID uint `json:"artist_id"`
	Artist Artist `json:"-"`
}
