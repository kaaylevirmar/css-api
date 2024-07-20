# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.0.0
FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the source files into the image.
COPY . .

RUN chown -R node:node /usr/src/api
# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3001

# Run the application.
CMD npm run dev
