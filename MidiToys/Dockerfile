# Use Node.js v16 as the base image
FROM node:lts

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Upgrade npm to the latest version
RUN npm install -g npm@latest

# Build the application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
# CMD ["npm", "start"]
