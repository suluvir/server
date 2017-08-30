GOPACKAGES_NOVENDOR = $(shell go list ./... | grep -v '/vendor/')
GOFILES_NOVENDOR = $(shell find . -type f -name '*.go' -not -path "./vendor/*")

testrun:
	go test -cover ${GOPACKAGES_NOVENDOR}

testfast:
	go test -cover ./...

release:
	env GOOS=linux GOARCH=arm go build -o dist/server_arm suluvir.go
	env GOOS=windows GOARCH=386 go build -o dist/server_x64.exe suluvir.go
	env GOOS=linux GOARCH=amd64 go build -o dist/server_amd64 suluvir.go

build:
	go build

install:
	go install
