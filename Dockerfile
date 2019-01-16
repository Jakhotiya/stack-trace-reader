FROM node:10.15.0

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8081

CMD ["npm run-script build"]

CMD ["node", "server.js"]