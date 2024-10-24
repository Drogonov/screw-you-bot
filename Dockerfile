# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Argument for specifying the environment
ARG NODE_ENV=development
ARG DB_PORT=5432

# Copy only essential files for environment setup initially
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install Nest CLI globally to use Nest commands in the container
RUN npm install -g @nestjs/cli

# Install TypeScript and other necessary dev dependencies
RUN npm i --save-dev @types/node typescript

# Copy the prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy the application code
COPY . .

# Install openssl for secure connections
RUN apk add --no-cache openssl

# Install dockerize for service health checks
ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Utilizing a shell to dynamically check the DB port
CMD ["sh", "-c", "dockerize -wait tcp://dev-db:${DB_PORT} -timeout 60m yarn start"]