# ---------- Сборка ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --network-timeout 600000

COPY . .
RUN yarn build

# ---------- Раздача статики ----------
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
