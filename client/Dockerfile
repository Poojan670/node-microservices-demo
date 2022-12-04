FROM node:alpine

WORKDIR /src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY ./ ./

CMD ["yarn", "start"]