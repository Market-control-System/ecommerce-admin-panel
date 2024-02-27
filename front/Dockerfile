
FROM --platform=linux/amd64 node:21.1.0 as build-stage
WORKDIR /front
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage

RUN mkdir /front
COPY --from=build-stage /front/dist /front
COPY nginx.conf /etc/nginx/nginx.conf

# Новая команда для проверки
RUN cat /etc/nginx/nginx.conf
# docker build  -t sheff2000/ecommercefront:0.1 .
# docker build --platform linux/arm64 -t sheff2000/ecommercefront:0.1 .