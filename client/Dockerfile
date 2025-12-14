FROM node:18-alpine as builder

WORKDIR /app

COPY ["package.json","package-lock.json","./"]

RUN npm ci

COPY ["public","./public"]
COPY ["src","./src"]
COPY [".env","./"]
COPY ["index.html","postcss.config.js","tailwind.config.js","tsconfig.json","tsconfig.node.json", "vite.config.ts","./"]

ENV NODE_ENV=production

RUN npm run build

FROM nginx:stable-alpine

# Security: Disable server tokens in nginx main config
RUN sed -i 's/# server_tokens off;/server_tokens off;/' /etc/nginx/nginx.conf || true

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Healthcheck for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]



