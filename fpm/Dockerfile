FROM php:7.1-fpm-alpine

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Update repository
RUN set -xe apk update apk upgrade

# Fixed Intl version
RUN apk add --no-cache libintl icu icu-dev \
 && docker-php-ext-install intl \
 && apk del icu-dev \
 && docker-php-ext-install opcache

# Adding "dockerize" and "gosu"
RUN apk add dockerize gosu --no-cache \
     --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/

# Git (for Composer)
RUN apk add --no-cache git

# PDO & MySQL
RUN docker-php-ext-install pdo pdo_mysql

# Adding Composer CLI
RUN curl -sS https://getcomposer.org/installer | php \
 && mv composer.phar /usr/local/bin/composer

# Cleaning
RUN rm -rf /tmp/* /var/cache/apk/*
