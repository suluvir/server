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
	"bytes"
	"fmt"
	"github.com/suluvir/server/config"
	"github.com/suluvir/server/environment"
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
	"html/template"
	"net/smtp"
	"path"
)

type Mail struct {
	sender       string
	subject      string
	receiver     []string
	templateName string
	templateData interface{}
}

// NewMail creates a new Mail. It currently only supports a single receiver. templateName has to be a valid
// file within the layout/html directory
func NewMail(sender, receiver, subject, templateName string, templateData interface{}) Mail {
	templateName = path.Join(environment.GetBaseDirectory(), "layout", "html", templateName)
	return Mail{
		sender:       sender,
		receiver:     []string{receiver},
		subject:      subject,
		templateName: templateName,
		templateData: templateData,
	}
}

// ExecuteTemplate executes the template and returns it
func (m Mail) ExecuteTemplate() string {
	t, err := template.ParseFiles(m.templateName)
	if err != nil {
		logging.GetLogger().Error("error during template parse", zap.Error(err))
		return ""
	}

	buffer := new(bytes.Buffer)
	if err = t.Execute(buffer, m.templateData); err != nil {
		logging.GetLogger().Error("error during template execution", zap.Error(err))
		return ""
	}

	return buffer.String()
}

// Send sends the email
func (m Mail) Send() error {
	c := config.GetConfiguration()
	body := m.ExecuteTemplate()
	auth := smtp.PlainAuth("Suluvir", c.Mail.UserName, c.Mail.Password, c.Mail.ServerName)
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	subject := "Subject: " + m.subject + "!\n"
	msg := []byte(subject + mime + "\n" + body)
	addr := fmt.Sprintf("%s:%d", c.Mail.ServerName, c.Mail.Port)

	if err := smtp.SendMail(addr, auth, c.Mail.Email, m.receiver, msg); err != nil {
		logging.GetLogger().Error("error sending email", zap.Error(err))
		return err
	}

	return nil
}
