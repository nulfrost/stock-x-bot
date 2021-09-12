FROM node:16-alpine3.13 AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci

FROM node:16-alpine3.13 AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder ./app ./
CMD ["npm", "run", "start"]
