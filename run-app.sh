#!/bin/sh

echo "Building Frontend\r\n"

cd frontend && npm run build:prod --output-path=dist 

echo "Copying static files to Backend\r\n"

cp -r dist/* ../backend/src/main/resources/static/

echo "Building Backend\r\n"

cd ../backend && ./gradlew build

echo "Creating Container\r\n"

cd .. && docker compose up --build -d

echo "App started\r\n"