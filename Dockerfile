FROM node:10

WORKDIR /app

COPY ./*.json ./
RUN npm install

COPY index.js ./

EXPOSE 3000

CMD ["node", "index.js"]
