FROM node:14-alpine3.13 

WORKDIR /app

COPY package*.json .
COPY stockx-api-1.1.0.tgz .
RUN npm ci
COPY . .

CMD ["npm", "run", "start"]
