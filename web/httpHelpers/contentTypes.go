package httpHelpers

import "errors"

const (
	HTML      = "text/html; charset=uft-8"
	JSON      = "application/json; charset=uft-8"
	CSS       = "text/css; charset=utf-8"
	JS        = "application/javascript; charset=uft-8"
	SOURCEMAP = JSON
	MP3       = "audio/mpeg"
)

var contentTypeMapping = map[string]string{
	"mp3": MP3,
}

func GetContentType(fileType string) (string, error) {
	if contentType, ok := contentTypeMapping[fileType]; ok {
		return contentType, nil
	}
	return "", errors.New("could not find content type")
}
