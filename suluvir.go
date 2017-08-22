// Suluvir streaming server
// Copyright (C) 2017  Jannis Fink
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, version 3.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package main

import (
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/logging"
	"github.com/suluvir/server/schema"
	"github.com/suluvir/server/web"
	"github.com/urfave/cli"
	"go.uber.org/zap"
	"os"

	_ "github.com/suluvir/server/web/handler"
	_ "github.com/suluvir/server/web/handler/api/intnl"
	_ "github.com/suluvir/server/web/handler/api/v1"
	_ "github.com/suluvir/server/web/handler/appstatic"

	_ "github.com/suluvir/server/auth"
	_ "github.com/suluvir/server/auth/oauth"
	"github.com/suluvir/server/environment"
)

func main() {
	config.LoadConfiguration()
	defer schema.CloseDatabaseConnection()

	app := cli.NewApp()
	app.Name = "Suluvir"
	app.Usage = "Manage your own music"
	app.Version = config.GetConfiguration().Version
	app.Copyright = "Suluvir Copyright (C) 2017 Jannis Fink\n" +
		"   This program comes with ABSOLUTELY NO WARRANTY; for details type `show w' (TODO).\n" +
		"   This is free software, and you are welcome to redistribute it\n" +
		"   under certain conditions; type `show c' (TODO) for details.\n"

	logging.GetLogger().Info("suluvir started", zap.String("version", config.GetConfiguration().Version))

	var baseDirectory string

	app.Flags = []cli.Flag{
		cli.StringFlag{
			Name:        "base,b",
			Value:       "",
			Destination: &baseDirectory,
			Usage:       "Set the base path manually",
		},
	}

	app.Commands = []cli.Command{
		{
			Name:    "serve",
			Aliases: []string{"s"},
			Usage:   "Runs the server",
			Action: func(c *cli.Context) error {
				environment.SetBaseDirectory(baseDirectory)
				return web.InitializeServer(config.GetConfiguration().Web.OutsidePort)
			},
		},
		{
			Name:    "update",
			Aliases: []string{"u"},
			Usage:   "Creates or updates the database schema",
			Action: func(c *cli.Context) error {
				environment.SetBaseDirectory(baseDirectory)
				return schema.CreateOrUpdate()
			},
		},
	}

	app.Run(os.Args)
}
