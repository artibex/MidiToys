# Use node:lts as the base image for the build stage
FROM node:lts AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the website
RUN npm run build

# Use httpd:2.4 as the base image for the runtime stage
FROM httpd:2.4 AS runtime

# Copy the built website from the build stage to the Apache web server's document root
COPY --from=build /app/public /usr/local/apache2/htdocs/

# Expose port 80 for HTTP traffic
EXPOSE 80
