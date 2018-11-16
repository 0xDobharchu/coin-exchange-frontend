FROM node:10.13.0-alpine

COPY . /app/

WORKDIR /app

RUN yarn build

CMD ["node", "dist/server/server.js"]
