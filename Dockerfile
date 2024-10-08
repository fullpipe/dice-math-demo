# Build
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build -- --prod

FROM caddy:alpine as release

EXPOSE 8080
COPY  Caddyfile /etc/caddy/Caddyfile

COPY --from=build /app/dist/dice-math-demo/ /app/

