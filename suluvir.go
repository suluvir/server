package main

import (
	"github.com/urfave/cli"
	"os"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
)

func main() {
	config.LoadConfiguration()
	logging.InitializeLogger()

	var serverPort int

	app := cli.NewApp()
	app.Name = "Suluvir"
	app.Usage = "Manage you own music"
	app.Version = config.GetConfiguration().Version

	logging.GetLogger().Info("suluvir started", zap.String("version", config.GetConfiguration().Version))

	app.Commands = []cli.Command{
		{
			Name: "serve",
			Aliases: []string{"s"},
			Usage: "Runs the server",
			Flags: []cli.Flag{
				cli.IntFlag{
					Name: "port",
					Value: config.GetConfiguration().Web.DefaultPort,
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
