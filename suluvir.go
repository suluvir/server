package main

import (
	"github.com/urfave/cli"
	"os"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/config"
	"github.com/BurntSushi/toml"
)

const (
	DEFAULT_CONFIG = "suluvir.default.toml"
	USER_CONFIG = "suluvir.toml"
)

var configuration config.Config

func main() {
	var serverPort int
	configuration = loadConfig()

	app := cli.NewApp()
	app.Name = "Suluvir"
	app.Usage = "Manage you own music"
	app.Version = "0.0.1"

	app.Commands = []cli.Command{
		{
			Name: "serve",
			Aliases: []string{"s"},
			Usage: "Runs the server",
			Flags: []cli.Flag{
				cli.IntFlag{
					Name: "port",
					Value: GetConfiguration().Web.DefaultPort,
					Destination: &serverPort,
				},
			},
			Action: func(c *cli.Context) error {
				web.InitializeServer(serverPort)
				return nil
			},
		},
	}

	app.Run(os.Args)
}

func loadConfig() config.Config {
	var c config.Config
	if _, err := toml.DecodeFile(DEFAULT_CONFIG, &c); err != nil {
		// TODO log error
	}
	return c
}

func GetConfiguration() config.Config {
	return configuration
}
