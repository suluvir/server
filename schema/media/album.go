package media

import (
	"github.com/suluvir/server/schema"
)

type Album struct {
	schema.DatabaseObject
	Name string
	ArtistID uint
	Artist Artist
}
