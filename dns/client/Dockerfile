FROM node:alpine
LABEL MAINTAINER "Nazim Lachter <nlachter@gmail.com>"

WORKDIR /app

COPY package*.json ./
RUN npm install

ADD index.js .

CMD [ "npm", "start" ]
