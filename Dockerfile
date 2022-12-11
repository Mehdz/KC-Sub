FROM node:16.16.0

WORKDIR /app
COPY ["package.json", "yarn.lock", "./"]

RUN yarn install
COPY . .

CMD ["yarn", "./deploy-commands.js"]

CMD ["yarn", "start"]
