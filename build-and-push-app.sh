#!/bin/sh

if [ "$1" = "" ]; then
    echo "Please enter a commit message"
    exit 1
fi

echo "Building Frontend\r\n"

cd frontend && npm run build:prod --output-path=dist 

# echo "Copying static files to Backend\r\n"

# cp -r dist/* ../backend/src/main/resources/static/

echo "Building Backend\r\n"

cd ../backend && ./gradlew build

echo "Pushing Repo\r\n"

cd .. && git add . && git commit -m "$1" && git push

echo "App pushed\r\n"