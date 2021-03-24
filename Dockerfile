FROM node:14-slim

WORKDIR /app

COPY ./*.json ./
RUN npm ci

COPY . .

ENV dbHost='mongo:27017'
ENV dbUser='root'
ENV dbPass='example'

EXPOSE 3000

CMD ["npm", "start"]
