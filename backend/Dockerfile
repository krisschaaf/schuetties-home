FROM golang:alpine3.17

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY schuett-webapp-api ./

EXPOSE 8080

CMD [ "/schuett-webapp-api" ]