FROM golang:1.13 AS builder
COPY . /app
WORKDIR /app
RUN groupadd -r appuser && useradd --no-log-init -r -g appuser appuser
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" regolar.go

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /app /app/
WORKDIR /app
USER appuser
CMD [ "/app/regolar" ]