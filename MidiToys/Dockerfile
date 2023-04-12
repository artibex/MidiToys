FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

RUN npm install --save-dev astro

RUN npm install -g npm@latest

RUN npm install -g astro --unsafe-perm

COPY . .

RUN npm run build

CMD [ "npm", "start" ]
