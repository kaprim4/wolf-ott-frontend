# Step 1: Use Node.js to build the application
FROM node:18 as build

WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Angular application in production mode
RUN npm run build -- --configuration=production

# Step 2: Use Nginx to serve the application
FROM nginx:alpine

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the compiled Angular app from the build stage to the Nginx HTML directory
COPY --from=build /app/dist/Spike /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
