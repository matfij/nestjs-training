FROM node:14-alpine

WORKDIR /matfij/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

CMD [ "npm run", "start:prod" ]
