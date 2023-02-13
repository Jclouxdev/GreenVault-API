# FROM node:18-bullseye

# WORKDIR /opt

# COPY . .

# RUN npm ci

# CMD npm run start

FROM node:latest

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --quiet
COPY . .