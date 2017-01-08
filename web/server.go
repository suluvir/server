package web

import (
	"fmt"
	"net/http"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
)

func InitializeServer(port int) error {
	router := CreateRouter()
	ApplyRoutes(router)
	logging.GetLogger().Info("Starting server", zap.Int("port", port))
	return http.ListenAndServe(fmt.Sprintf(":%d", port), router)
}
