package config

type Config struct {
	Version  string
	Upload   upload
	Web      web
	Database database
}

type upload struct {
	Path     string
	Relative bool
}

type web struct {
	Port     int
	Hostname string
}

type database struct {
	Dialect          string
	ConnectionString string `toml:"connection_string"`
}
