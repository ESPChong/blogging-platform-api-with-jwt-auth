# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files and install ALL dependencies (including dev)
COPY package*.json ./
RUN npm ci

# Copy source code and Prisma schema
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build the TypeScript application
RUN npm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# Copy compiled TypeScript code from builder
COPY --from=builder /app/dist ./dist

# Copy Prisma schema and generated client
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Expose the port your app runs on (matching your app.ts)
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]