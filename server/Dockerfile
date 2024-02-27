FROM --platform=linux/amd64 node:21.1.0-alpine AS build-env
#FROM node:21.1.0-alpine AS build-env
#FROM --platform=linux/amd64 node:11.15

WORKDIR /server
COPY package*.json ./

RUN npm ci

COPY . ./
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000

CMD ["node", "server.js"]

#docker build  -t sheff2000/ecommerce-server:0.1 .
#docker push sheff2000/ecommerce-server:0.1 

#docker build --platform=linux/amd64 -t <sheff2000/ecommerce-server:0.1>

#docker run -d -p 3000:3000 --env-file server.env sheff2000/ecommerce-server:0.1