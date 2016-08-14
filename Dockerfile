FROM node

MAINTAINER Weiqiang Tang <tangweiqiang@hotmail.com>

RUN mkdir /vessel
WORKDIR /vessel
COPY . /vessel

RUN npm install
RUN npm install -g angularcli
COPY build.sh /build.sh

COPY docker-entrypoint.sh /vessel/docker-entrypoint.sh
RUN chmod +x /vessel/docker-entrypoint.sh
EXPOSE 4200
CMD /vessel/docker-entrypoint.sh
