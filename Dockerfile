# syntax=docker/dockerfile:1

# Installs Node.js image
FROM node:16.15-alpine

ENV NODE_ENV=production

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/bandlabs-assesment (e.g. /usr/bandlabs-assesment/package.json)
WORKDIR /bandlabs-assesment-imagegram

COPY . .

RUN npm install --production

RUN npm run build

EXPOSE 9000

# Runs the dev npm script to build & start the server
CMD npm run start