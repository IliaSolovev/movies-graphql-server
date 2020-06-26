FROM node:12

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY . /usr/src/app/
RUN npm install --silent

EXPOSE 8080

CMD ["node", "server/app.js"]