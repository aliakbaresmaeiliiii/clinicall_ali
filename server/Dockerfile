FROM node:22-alpine
LABEL author="aliakbar"

# Setup Timezone
RUN	apk add tzdata
ENV TZ=Asia/Kuala_Lumpur

RUN apk add nano

# Create app directory
WORKDIR /var/www

# Bundle app source
COPY . /var/www

# Set config npm & install dependencies
# RUN npm config set scripts-prepend-node-path true
RUN npm install typescript -g
RUN npm install pm2 -g

# Build app
RUN yarn build:docker

EXPOSE 7000

# Run for development
# CMD ["yarn", "dev"]

# Run for production
CMD ["yarn", "serve:production-docker"]
