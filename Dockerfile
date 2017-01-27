FROM node:alpine
MAINTAINER ffxblue

WORKDIR /usr/src/app

COPY package.json package.json
RUN apk add --no-cache --virtual .build-deps \
    make gcc g++ python && \
    npm i && \
    apk del .build-deps
COPY . .

EXPOSE 25
CMD ["node", "index.js"]
