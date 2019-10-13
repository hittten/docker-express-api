FROM node:10

RUN npm install -g nodemon

WORKDIR /app

COPY ./*.json ./
RUN npm install

COPY index.js ./

EXPOSE 3000

CMD ["nodemon", "index.js"]
