# Regolar
A Go regular expression editor. Inspired by Rubular.com, a ruby regex editor. You can access Regolar at <a href="https://regolar.wanglei.me/" target="_blank">regolar.wanglei.me</a>

<img src="./demo1.png">
<img src="./demo2.png">

## Run
You can build the project in Go directly.
``` shell
go build regolar.go
./regolar
```
Or, you can use `docker run` and run the project on any machine with this command:
``` shell
docker run -t -p 8080:8080 wlchn/regolar /app/regolar
```
Docker will pull it from the repository.

Server is running on 8080

## License
MIT
