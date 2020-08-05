FROM node:14.5.0-alpine as client
WORKDIR /var/app
COPY ./frontend/package.json .
RUN npm install
COPY ./frontend .
RUN npm run build

FROM node:14.5.0-alpine
WORKDIR /var/app
COPY --from=client /var/app/build ./build
COPY ./backend/package.json .
RUN npm install
COPY ./backend .
CMD [ "npm", "run", "start" ]
