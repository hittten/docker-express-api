# Docker express api

## run

`npm start`

## Image for production

- Build `docker build --rm -t USER/docker-express-api:1.0.0 .`
- Run `docker run --rm -p 3000:3000 --name my-api USER/docker-express-api`
- Entry `docker exec -it my-api /bin/bash`
- Publish `docker login` and `docker push USER/docker-express-api:1.0.0`

## Run for developers

`docker-compuse up`
