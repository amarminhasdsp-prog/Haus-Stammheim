# syntax=docker/dockerfile:1
# Multi-Stage-Build: React/Vite-Produktions-Build, ausgeliefert ueber nginx.
#
# Stage 1 (builder): installiert exakt gepinnte Dependencies (npm ci) und
# erzeugt den statischen Produktions-Build in dist/.
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2 (runner): nur der statische dist/-Output, ausgeliefert von nginx.
# Kein Node/npm im finalen Image -> kleines, schlankes Produktions-Image
# ohne Build-Tooling oder devDependencies.
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
