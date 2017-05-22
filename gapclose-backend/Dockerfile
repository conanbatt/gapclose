FROM node:alpine

# Update & install required packages
RUN apk add --update nodejs bash git

# Install app dependencies
COPY package.json /www/package.json
RUN cd /www; npm install

# Copy app source
COPY . /www

# Set work directory to /www
WORKDIR /www

ENV PORT 3003
EXPOSE  3003

# start command as per package.json
CMD ["npm", "start"]
