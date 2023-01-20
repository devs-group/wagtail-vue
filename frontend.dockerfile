FROM node:16.18.1

WORKDIR /app

COPY ./package*.json ./
RUN yarn install

COPY ./vite.config.ts ./vite.config.ts
COPY ./vue ./vue
