package media

import (
	"github.com/suluvir/server/schema"
)

type Artist struct {
	schema.DatabaseObject
	Name string
	Albums []Album
}
