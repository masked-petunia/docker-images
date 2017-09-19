FROM alpine:latest

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Update repository
RUN set -xe apk update apk upgrade

# Nginx & PHP
RUN apk --update add nginx php7-fpm

# Adding "dockerize" and "gosu"
RUN apk add dockerize gosu --no-cache \
     --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/

# Git (for Composer)
RUN apk add --no-cache git

# Adding Composer CLI
RUN curl -sS https://getcomposer.org/installer | php \
 && mv composer.phar /usr/local/bin/composer

# PDO & MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Java
RUN apk add --update openjdk8-jre-base

# NodeJS
RUN apk add --update nodejs

# NodeJS dependencies
RUN npm install -g bower less

# Cleaning
RUN rm -rf /tmp/* /var/cache/apk/*

# Nginx config
mkdir -p /run/nginx

# Exposing the port
EXPOSE 80
