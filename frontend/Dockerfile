FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production - serve with simple http server
FROM node:20-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/dist ./dist

EXPOSE 3004

CMD ["serve", "-s", "dist", "-l", "3004"]
