package web

import (
	"fmt"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"net/http"
)

func InitializeServer(port int) error {
	router := InitializeRouter()
	logging.GetLogger().Info("Starting server", zap.Int("port", port))
	return http.ListenAndServe(fmt.Sprintf(":%d", port), router)
}
