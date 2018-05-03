FROM node:9.11.1

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

COPY . .

RUN npm install

RUN npm run build --production

RUN npm install -g serve

CMD serve --port 8081 -s build

EXPOSE 8081
