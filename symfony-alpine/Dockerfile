FROM alpine:latest

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Update repository
RUN set -xe apk update apk upgrade

# Adding "gosu"
RUN apk add gosu --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/

# Nginx & PHP
RUN apk --update add nginx php7-fpm

# PHP extensions
RUN apk add php7-mcrypt php7-soap php7-openssl php7-gmp php7-pdo_odbc \
            php7-json php7-dom php7-pdo php7-zip php7-mysqli \
            php7-sqlite3 php7-apcu php7-pdo_pgsql php7-bcmath php7-gd \
            php7-odbc php7-pdo_mysql php7-pdo_sqlite php7-gettext \
            php7-xmlreader php7-xmlrpc php7-bz2 php7-session \
            php7-iconv php7-pdo_dblib php7-curl php7-ctype php7-phar \
            php7-tokenizer php7-xmlwriter php7-fileinfo php7-simplexml \
            php7-mbstring php7-xml

# GD lib
RUN apk add coreutils freetype-dev libjpeg-turbo-dev libltdl libmcrypt-dev libpng-dev

# Git & curl (for Composer)
RUN apk add git curl

# Adding Composer CLI
RUN curl -sS https://getcomposer.org/installer | php \
 && mv composer.phar /usr/local/bin/composer

# Java
RUN apk add --update openjdk8-jre-base

# NodeJS
RUN apk add --update nodejs nodejs-npm

# NodeJS packages
RUN npm install -g bower less

# Cleaning
RUN rm -rf /tmp/* /var/cache/apk/*

# Preparing www
RUN adduser -D -u 1000 -g 'www' www
RUN mkdir -p /run/nginx /www
RUN chown -R www:www /run/nginx /www

# Exposing the port
EXPOSE 80
