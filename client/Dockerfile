FROM node:alpine

WORKDIR /src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]