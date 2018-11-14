FROM node:10.13.0-alpine

COPY ./dist /app/dist
WORKDIR /app

CMD ["node", "dist/server/server.js"]
