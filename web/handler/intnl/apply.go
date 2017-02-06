package intnl

import "github.com/suluvir/server/web"

func init() {
	r := web.GetRouter().PathPrefix("/api/internal").Subrouter()
	r.HandleFunc("/my/songs", MySongsHandler)
}
