# Stage 1: Build the React app
FROM node:18 as build

WORKDIR /app

# Configure npm
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies with retry logic
RUN npm ci || \
    (echo "First attempt failed, retrying..." && sleep 5 && npm ci) || \
    (echo "Second attempt failed, retrying..." && sleep 10 && npm ci)

# Copy all other files
COPY . .

# Build the app (using Vite)
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 5173

# Start nginx
CMD ["nginx", "-g", "daemon off;"]