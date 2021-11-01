FROM node:14-alpine AS development

WORKDIR /matfij/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:14-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /matfij/src/app

COPY --from=development /matfij/src/app .

EXPOSE ${PORT}

CMD [ "node", "dist/main" ]
