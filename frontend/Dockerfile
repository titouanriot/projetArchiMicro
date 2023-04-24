# FROM node:18
# RUN mkdir /usr/src/app 
# WORKDIR /usr/src/app
# RUN npm install -g @angular/cli
# COPY . . 

FROM node:latest
WORKDIR /opt/front
COPY . /opt/front
RUN npm install && npm run build
EXPOSE 8080