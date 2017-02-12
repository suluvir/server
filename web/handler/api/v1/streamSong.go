package v1

import (
	"fmt"
	"github.com/gorilla/mux"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/schema/media"
	"github.com/suluvir/server/web/httpHelpers"
	"github.com/uber-go/zap"
	"io/ioutil"
	"net/http"
)

func SongApiStreamHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var song media.Song
	schema.GetDatabase().First(&song, "id = ?", vars["id"])

	songFilePath, err := song.GetUploadFilePath()
	if err != nil {
		logging.GetLogger().Error("error during song file path calculation", zap.Error(err))
	}

	songData, readErr := ioutil.ReadFile(songFilePath)
	if readErr != nil {
		logging.GetLogger().Error("error during song reading", zap.Error(readErr))
	}

	contentDisposition := fmt.Sprintf("inline;filename=\"%s.%s\"", song.Title, "mp3")
	w.Header().Add(httpHelpers.CONTENT_TYPE, httpHelpers.MP3)
	w.Header().Add(httpHelpers.CONTENT_DISPOSITION, contentDisposition)
	//$contentDisposition = "inline;filename=\"{$song->getTitle()}.{$song->getExtension()}\"";
	w.Write(songData)
}
