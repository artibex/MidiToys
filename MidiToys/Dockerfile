FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production
RUN npm install --save-dev astro

COPY . .

# Upgrade npm to the latest version
RUN npm install -g npm@latest

RUN npm run build

CMD [ "npm", "start" ]




