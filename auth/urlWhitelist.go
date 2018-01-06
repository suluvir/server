// Suluvir streaming server
// Copyright (C) 2018  Jannis Fink
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

package auth

import (
	"github.com/suluvir/server/logging"
	"go.uber.org/zap"
	"regexp"
)

// whitelistedUrls contains all urls excluded from access check. Interpreted as regexp
var whitelistedUrls = []string{
	"^/activate/",
	"^/login",
	"^/register*",
	"^/appstatic/*",
	"^/nodestatic/*",
	"^/static/*",
	"^/api/internal/register",
	"^/api/internal/user/register",
	"^/api/internal/user/login",
	"^/api/oauth/",
}

// loggedInBlacklistedUrls contains all urls not allowed for logged in users
var loggedInBlacklistedUrls = []string{
	"^/activate/",
	"^/login",
	"^/register*",
	"^/api/internal/register",
	"^/api/internal/user/register",
	"^/api/internal/user/login",
}

var whitelistedUrlsRegexp = []*regexp.Regexp{}

var loggedInBlacklistedUrlsRegexp = []*regexp.Regexp{}

type UrlRegexpCheck struct {
	url     string
	regexes []*regexp.Regexp
}

func init() {
	for _, regexpString := range whitelistedUrls {
		r := regexp.MustCompile(regexpString)
		whitelistedUrlsRegexp = append(whitelistedUrlsRegexp, r)
	}

	for _, regexpString := range loggedInBlacklistedUrls {
		r := regexp.MustCompile(regexpString)
		loggedInBlacklistedUrlsRegexp = append(loggedInBlacklistedUrlsRegexp, r)
	}
}

// NewUrlWhitelistCheck returns a checker to check, if a given url should be accessible without login
func NewUrlWhitelistCheck(url string) *UrlRegexpCheck {
	return &UrlRegexpCheck{
		url:     url,
		regexes: whitelistedUrlsRegexp,
	}
}

// NewUrlBlacklistCheck returns the blacklisted urls for a logged in user
func NewUrlBlacklistCheck(url string) *UrlRegexpCheck {
	return &UrlRegexpCheck{
		url:     url,
		regexes: loggedInBlacklistedUrlsRegexp,
	}
}

// Check returns true, if the url specified is on the whitelist for urls requestable without user
// authentication
func (u *UrlRegexpCheck) Check() bool {
	logging.GetLogger().Debug("checking url for presence in whitelist", zap.String("url", u.url))
	for _, r := range u.regexes {
		if r.MatchString(u.url) {
			logging.GetLogger().Debug("url is allowed", zap.String("url", u.url))
			return true
		}
	}
	logging.GetLogger().Debug("url is forbidden", zap.String("url", u.url))
	return false
}
