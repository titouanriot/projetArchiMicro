FROM node:latest
WORKDIR /opt/front
COPY . /opt/front
RUN npm install && npm run build
EXPOSE 8080