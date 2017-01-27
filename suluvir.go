package main

import (
	"github.com/urfave/cli"
	"os"
	"github.com/suluvir/server/web"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/uber-go/zap"
	"github.com/suluvir/server/schema"

	_ "github.com/suluvir/server/web/handler/api/v1"
	_ "github.com/suluvir/server/web/handler"
)

func main() {
	config.LoadConfiguration()
	defer schema.CloseDatabaseConnection()

	app := cli.NewApp()
	app.Name = "Suluvir"
	app.Usage = "Manage your own music"
	app.Version = config.GetConfiguration().Version

	logging.GetLogger().Info("suluvir started", zap.String("version", config.GetConfiguration().Version))

	app.Commands = []cli.Command{
		{
			Name: "serve",
			Aliases: []string{"s"},
			Usage: "Runs the server",
			Action: func(c *cli.Context) error {
				return web.InitializeServer(config.GetConfiguration().Web.Port)
			},
		},
		{
			Name: "update",
			Aliases: []string{"u"},
			Usage: "Creates or updates the database schema",
			Action: func(c *cli.Context) error {
				return schema.CreateOrUpdate()
			},
		},
	}

	app.Run(os.Args)
}
