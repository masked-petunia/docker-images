FROM alpine:latest

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Update repository
RUN set -xe apk update apk upgrade

# Adding "dockerize" and "gosu"
#RUN apk add dockerize gosu --no-cache \
#     --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/

# Nginx & PHP
RUN apk --update add nginx php7 php7-fpm

# PHP extensions
RUN apk add php7-json php7-phar php7-openssl \
    php7-curl php7-xml php7-dom php7-pdo \
    php7-pdo_mysql php7-ctype php7-iconv

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

# Prepare configs
RUN mkdir -p /run/nginx

# Exposing the port
EXPOSE 80
