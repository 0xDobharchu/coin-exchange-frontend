FROM node:10.13.0-alpine

COPY ./dist /app/dist
COPY package.json /app
COPY yarn.lock /app

WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh
RUN apk --no-cache add --virtual native-deps \
    g++ gcc libgcc libstdc++ linux-headers make python && \
    npm install --quiet node-gyp -g &&\
    npm install --quiet && \
    apk del native-deps

RUN yarn
CMD ["yarn", "start"]
