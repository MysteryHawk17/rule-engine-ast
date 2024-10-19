# Use the official Node.js image with Alpine Linux for a lightweight build
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
# Copy package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Install all dependencies (both production and devDependencies)
RUN npm install

# Copy all source code into the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the application's port (match this with your server's listening port)
EXPOSE 8000

# Default command to run in development mode
CMD ["npm", "run", "dev"]
