FROM node:4-onbuild
# replace this with your application's default port

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm run build

# Bundle app source
COPY . /usr/src/app

ENV PORT 3000
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "npm", "start" ]
