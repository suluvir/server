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

package util

import (
	"errors"
	"regexp"
	"strconv"
)

const (
	k = "K"
	m = "M"
	g = "G"
	t = "T"
	p = "P"
)

const step = 1024

var order = []string{
	k,
	m,
	g,
	t,
	p,
}

var expressionRegex = regexp.MustCompile("(?P<amount>\\d*)(?P<factor>[KMGTP]?)")

// GetBytes converts the given input to its byte value. In any error case, it will return -1 and an error
func GetBytes(input string) (int64, error) {
	if !expressionRegex.MatchString(input) {
		return -1, errors.New("input for GetBytes is not valid, got: " + input)
	}
	amount, factor := getAmountAndFactor(input)
	if factor == "" {
		return amount, nil
	}

	index := 0
	for true {
		amount *= step
		if order[index] == factor {
			return amount, nil
		}
		index += 1
	}

	return -1, errors.New("this cannot happen")
}

func getAmountAndFactor(input string) (int64, string) {
	var amount int64
	var factor string
	match := expressionRegex.FindStringSubmatch(input)
	for i, name := range expressionRegex.SubexpNames() {
		if name == "amount" {
			amount, _ = strconv.ParseInt(match[i], 10, 64)
		} else if name == "factor" {
			factor = match[i]
		}
	}

	return amount, factor
}
