FROM dauden/node-base:latest

# File Author / Maintainer
MAINTAINER Black Bean, tuananh@autonomous.nyc

ENV TEMPDIR /home/node/tmp

RUN mkdir -p /app
WORKDIR /app

COPY ./ /app/

RUN rm -rf /app/node_modules

RUN yarn build

EXPOSE 8000 8000

ENTRYPOINT ["sh", "/app/entrypoint.sh"]

CMD ["yarn", "start"]
