testrun:
	go test -cover ./...

release:
	env GOOS=linux GOARCH=arm go build -o dist/server_arm suluvir.go
	env GOOS=windows GOARCH=386 go build -o dist/server_x64.exe suluvir.go
	env GOOS=linux GOARCH=amd64 go build -o dist/server_amd64 suluvir.go

build:
	go build

install:
	go install
