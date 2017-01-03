package config

import (
	"github.com/BurntSushi/toml"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
)

const (
	DEFAULT_CONFIG = "suluvir.default.toml"
	USER_CONFIG = "suluvir.toml"
)

var configuration Config

func LoadConfiguration() {
	// TODO ensure that it is not called multiple times?
	if _, err := toml.DecodeFile(DEFAULT_CONFIG, &configuration); err != nil {
		logging.GetLogger().Error("Error loading configuration", zap.Error(err))
	}
}

func GetConfiguration() Config {
	return configuration
}
