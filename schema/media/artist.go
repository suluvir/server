package media

import (
	"github.com/suluvir/server/schema"
)

type Artist struct {
	schema.DatabaseObject
	Name string `json:"name"`
	Albums []Album `json:"-"`
}

func init() {
	schema.AddSchema(&Artist{})
}
