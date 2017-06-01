GOPACKAGES_NOVENDOR = $(shell go list ./... | grep -v '/vendor/')
GOFILES_NOVENDOR = $(shell find . -type f -name '*.go' -not -path "./vendor/*")

testrun:
	go test -cover ${GOPACKAGES_NOVENDOR}

build:
	go build

install:
	go install
