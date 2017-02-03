package printer

import (
	"html/template"
	"net/http"
)

func PrintHtmlPageFromFile(w http.ResponseWriter, fileName string, data interface{}) {
	t, err := template.ParseFiles(fileName)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	t.Execute(w, data)
}
