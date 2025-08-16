# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# ---- Run stage ----
FROM node:18-alpine AS runner
WORKDIR /app

# For healthcheck curl
RUN apk add --no-cache curl

# Copy deps + source
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

ENV PORT=3001
EXPOSE 3001

CMD ["npm", "start"]

