FROM node:16

ADD crontab /etc/cron.d/update-cron
RUN chmod 0644 /etc/cron.d/update-cron
RUN touch /var/log/cron.log
RUN apt-get update
RUN apt-get -y install cron git

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 80
CMD nodemon server.js && cron && tail -f /var/log/cron.log