FROM node
# replace this with your application's default port

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install
RUN npm run build

# Bundle app source

EXPOSE 80
ENV PORT 80
ENV NODE_ENV=production
CMD [ "npm", "start" ]
