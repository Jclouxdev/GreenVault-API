FROM node:18-bullseye

WORKDIR /opt

COPY . .

RUN npm ci

CMD npm run start