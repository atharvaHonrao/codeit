# FROM node:17-alpine
# WORKDIR /app
# COPY package.json .
# RUN npm install
# COPY . .
# CMD ["npm", "run", "dev"]


# Use Node.js LTS version as base image
FROM node:lts AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Vite app for production
RUN npm run build

# Use NGINX as the server for static files
FROM nginx:alpine

# Copy the NGINX configuration to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from the previous stage into NGINX server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Default command to start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
