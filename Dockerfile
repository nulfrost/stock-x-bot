FROM node:14-alpine3.13 AS base
WORKDIR /app
COPY package*.json .
COPY . .
RUN npm install

FROM node:alpine
COPY --from=base /app /app
CMD ["node", "index.js"]