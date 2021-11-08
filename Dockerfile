# Build
FROM node:lts-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build -- --prod

# # App image
# FROM trion/nginx-angular

# COPY --from=build /app/dist/share-secret-frontend/ /usr/share/nginx/html/


# App image
FROM fullpipe/ngserve:latest

COPY --from=build /app/dist/dice-math-demo/ /app/
