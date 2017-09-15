FROM golang:1.8

WORKDIR /go/src/app
ADD . /go/src/app

EXPOSE 8080

CMD ["go", "run", "regolar.go"]