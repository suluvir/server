gopackages := $(go list ./... | grep -v '/vendor/')

build:
	go build

install:
	go install

test:
	echo $(gopackages)
	go test $(gopackages)
