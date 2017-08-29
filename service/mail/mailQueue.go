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

package mail

import (
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
)

var queue chan Mail

func init() {
	queue = make(chan Mail, 100)

	environment.RegisterCallback(mailLoop, environment.START_SERVICES)
}

// QueueMail queues a new mail that should be sent
func QueueMail(mail Mail) {
	logging.GetLogger().Debug("queue mail")
	queue <- mail
	logging.GetLogger().Debug("mail queued")
}

func mailLoop() {
	if config.GetConfiguration().Mail.ServerName == "" {
		logging.GetLogger().Info("mail loop is disabled. Configure mail in the config file")
		return
	}
	logging.GetLogger().Info("starting mail loop")
	for mail := range queue {
		logging.GetLogger().Debug("got mail to send", zap.String("subject", mail.subject))
		err := mail.Send()
		if err != nil {
			logging.GetLogger().Error("error during mail sending, attempt retry")
			// put mail back into queue to retry; TODO this might be unwise
			queue <- mail
		}
	}
}
