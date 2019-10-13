# Docker app

## Build
`docker build --rm -t hittten/docker-api .`

## Run
`docker run -d --rm -p 3000:3000 --name docker-api hittten/docker-api`

## Entry into the container
`docker exec -it docker-api /bin/bash`

## Remove all containers   
`docker rm $(docker ps -aq)`

## Run for developers
`docker run --rm -p 3000:3000 -v $(pwd)/dist/docker-api:/usr/share/nginx/html/ --name docker-api hittten/docker-api`
