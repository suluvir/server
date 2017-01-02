package main

import (
	"github.com/urfave/cli"
	"os"
	"github.com/suluvir/server/web"
)

func main() {
	var serverPort int

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
					Value: 8080,
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
