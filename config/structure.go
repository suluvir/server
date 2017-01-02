package config

type Config struct {
	Version string
	Upload upload
	Web web
}

type upload struct {
	Path string
	Relative bool
}

type web struct {
	DefaultPort int `toml:"default_port"`
}
