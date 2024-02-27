# Этап сборки для фронта
FROM node:14 as build-front
WORKDIR /app
COPY front/package*.json ./
RUN npm install
COPY front/ ./
RUN npm run build

# Этап сборки для сервера
FROM node:14 as build-server
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ ./
COPY --from=build-front /app/dist /app/public

# Финальный этап
FROM node:14
WORKDIR /app
COPY --from=build-server /app /app
COPY server/.env ./
EXPOSE 3000
CMD ["npm", "start"]

# docker build -t ecommerce-admin-panel .