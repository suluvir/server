# Suluvir server

[![Build Status](https://travis-ci.org/suluvir/server.svg?branch=master)](https://travis-ci.org/suluvir/server) [![Go Report Card](https://goreportcard.com/badge/github.com/suluvir/server)](https://goreportcard.com/report/github.com/suluvir/server)

## Setup

1. If you want to add dependencies, install [`glide`](https://glide.sh)
1. Run `make install` (if you are on linux) to build the executable
1. Install [`npm`](https://nodejs.org/en/download/) (comes with `node`)
1. Install webpack: `npm install -g webpack`
1. Make sure webpack's version is >2.2 (`webpack --version`)
1. `cd layout/js`
1. Run `npm install`
1. Run `webpack`
1. Initialize the database schema (`server update`)
1. Run the server (`server serve`)
1. Visit [http://localhost:8080](http://localhost:8080) to see it in action

## Tests

### Go

Just run `make`

### JavaScript

TBD
