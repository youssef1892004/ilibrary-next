# Stage 1: Builder
FROM node:22-alpine AS builder
WORKDIR /app

# Install libc6-compat for sharp compatibility
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:22-alpine AS runner
WORKDIR /app

# Install libc6-compat for sharp compatibility
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production
ENV NEXT_SHARP_PATH=/app/node_modules/sharp

COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
