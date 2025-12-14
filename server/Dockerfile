# Builder stage

FROM node:18-alpine AS builder

WORKDIR /app

COPY ["package.json","package-lock.json","./"]

RUN npm ci

COPY ["src","./src"]

COPY ["tsconfig.json", "./"]

RUN npm run build

# Final stage

FROM node:18-alpine

# Security: Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

COPY --from=builder /app/package.json ./

COPY --from=builder /app/package-lock.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Security: Run as non-root user
USER nodejs

# Healthcheck for container orchestration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api || exit 1

CMD [ "node", "dist/main.js"]