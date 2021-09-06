FROM node:16-alpine3.13 AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM node:16-alpine3.13 AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder ./app ./
CMD ["node", "src/index.js"]
