FROM node:10

RUN npm install -g nodemon

WORKDIR /app

COPY ./*.json ./
RUN npm install

COPY *.js ./

ENV DB_HOST='mongo:27017'
ENV DB_USER='root'
ENV DB_PASS='example'

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000

CMD ["nodemon", "index.js"]
