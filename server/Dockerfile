FROM node:18-alpine

WORKDIR /server
RUN apk update && apk add --no-cache g++
COPY package.json .
RUN npm install
COPY . /server
EXPOSE 8000
CMD ["node", "server.js"]
