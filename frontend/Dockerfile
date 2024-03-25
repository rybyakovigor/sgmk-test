ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-alpine as builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json  yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

FROM node:${NODE_VERSION}-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=builder /app/.output  /app/.output
