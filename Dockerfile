FROM node:4-onbuild

MAINTAINER Weiqiang Tang <tangweiqiang@hotmail.com>

RUN mkdir /vessel
WORKDIR /vessel
COPY . /vessel

RUN npm install

EXPOSE 4200
RUN ng serve
