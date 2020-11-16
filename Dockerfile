FROM node:12
WORKDIR /usr/src/app
RUN npm config set registry http://registry.npmjs.org
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001