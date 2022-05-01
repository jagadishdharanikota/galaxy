# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.19.1-alpine3.14 as build-stage
# FROM tiangolo/node-frontend:latest as build-stage

LABEL MAINTAINER Jagadish Dharanikota<jagadishcse520@gmail.com>

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# To run server directly in docker container
# EXPOSE 8000

# CMD [ "node", "server.js" ]

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
# FROM nginx:1.15
FROM nginx:mainline-alpine

COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
