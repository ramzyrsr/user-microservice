FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 8080

RUN npm install -g nodemon

CMD npm start