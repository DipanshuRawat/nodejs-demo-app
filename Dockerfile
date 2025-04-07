FROM node:18

# Create working directory
WORKDIR /usr/src/app

# Copy app.js and package.json into the container
COPY package.json .
COPY app.js .

# Install dependencies
RUN npm install

# Expose port 2000
EXPOSE 2000

# Run the app
CMD ["node", "app.js"]
