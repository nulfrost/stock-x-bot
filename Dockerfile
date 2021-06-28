FROM node:14-alpine3.13 

WORKDIR /app

COPY package*.json .
RUN npm ci
COPY . .

CMD ["node", "index.js"]
