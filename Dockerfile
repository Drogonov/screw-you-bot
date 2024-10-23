# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
ADD package*.json ./

# Copy the application code to the working directory
COPY . .

# installing node packages
RUN npm install -g npm@7.19.1
RUN npm install

# now starts boilerplate code that installs openssl, dockerize and setups them
RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# dockerize will wait port DOCKERFILE_DB_PORT till it will start working and when it starts we will start our app
CMD dockerize -wait tcp://postgres:5432 -timeout 60m yarn start