GOPACKAGES_NOVENDOR = $(shell go list ./... | grep -v '/vendor/')
GOFILES_NOVENDOR = $(shell find . -type f -name '*.go' -not -path "./vendor/*")

build:
	go build

install:
	go install

test:
	go test ${GOPACKAGES_NOVENDOR}
