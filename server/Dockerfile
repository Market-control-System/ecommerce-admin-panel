FROM --platform=linux/amd64 node:21.1.0-alpine AS build-env
#FROM node:21.1.0-alpine AS build-env
#FROM --platform=linux/amd64 node:11.15

# Устанавливаем Python и инструменты для сборки
RUN apk add --no-cache python3 py3-pip make g++ \
    && ln -sf python3 /usr/bin/python


WORKDIR /server
COPY package*.json ./

#RUN npm ci
RUN npm ci && npm rebuild bcrypt --build-from-source
COPY . ./
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000

CMD ["node", "server.js"]

#docker build  -t sheff2000/ecommerce-server:0.1 .
#docker push sheff2000/ecommerce-server:0.1 

#docker build --platform=linux/amd64 -t <sheff2000/ecommerce-server:0.1>

# docker build --platform linux/arm64/v8 -t sheff2000/ecommerce-server:0.1 .
#docker run -d -p 3000:3000 --env-file /home/user/project/server.env sheff2000/ecommerce-server:0.1