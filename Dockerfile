FROM node:4-onbuild

MAINTAINER Weiqiang Tang <tangweiqiang@hotmail.com>

RUN mkdir /vessel
WORKDIR /vessel
COPY . /vessel

RUN npm install
COPY docker-entrypoint.sh docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh
EXPOSE 4200
CMD /code/docker-entrypoint.sh
