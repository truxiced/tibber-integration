FROM node:16.15.0-alpine3.15 as build

RUN mkdir /home/node/app
WORKDIR /home/node/app

ADD . .

ENV NODE_ENV=production
USER node

CMD node main.js
