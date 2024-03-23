FROM node:18-bullseye-slim as builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn build

FROM node:18-bullseye-slim

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
RUN command mkdir -p /app/uploads

COPY --from=builder /app/node_modules/ ./node_modules
COPY --from=builder /app/dist/ ./dist
