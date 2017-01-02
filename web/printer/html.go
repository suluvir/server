package printer

import (
	h "net/http"
	"github.com/suluvir/server/web/http"
	"os"
	"fmt"
)

func PrintHtmlPageFromFile(w h.ResponseWriter, fileName string) {
	file, err := os.Open(fileName)
	if err != nil {
		w.WriteHeader(h.StatusInternalServerError)
	}
	defer file.Close()
	w.Header().Add(http.CONTENT_TYPE, http.HTML)
	fmt.Fprint(w, file.Rea)
}
