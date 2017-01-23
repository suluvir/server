package manage

import (
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
)

func CreateOrUpdate() error {
	logging.GetLogger().Debug("create or update database schema")
	db := schema.GetDatabase()

	db.AutoMigrate(&media.Song{})
	db.AutoMigrate(&media.Artist{})
	db.AutoMigrate(&media.Album{})

	return nil
}
