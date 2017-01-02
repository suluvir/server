package config

import "github.com/BurntSushi/toml"

const (
	DEFAULT_CONFIG = "suluvir.default.toml"
	USER_CONFIG = "suluvir.toml"
)

var configuration Config

func LoadConfiguration() {
	// TODO ensure that it is not called multiple times?
	if _, err := toml.DecodeFile(DEFAULT_CONFIG, &configuration); err != nil {
		// TODO log error
	}
}

func GetConfiguration() Config {
	return configuration
}
