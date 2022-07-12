# Installs Node.js image
FROM node:16.15-alpine

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/bandlabs-assesment (e.g. /usr/bandlabs-assesment/package.json)
WORKDIR /api

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

RUN npm install -g npm@8.13.2
RUN npm install

COPY . .

RUN npm run build

EXPOSE 9000

# Runs the dev npm script to build & start the server
# CMD npm run start
CMD ["node", "dist/server.js"]