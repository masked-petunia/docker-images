FROM nginx:alpine

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Update repository
RUN apk update && apk upgrade

# PHP
RUN apk add php7-fpm

# PHP extensions
RUN apk add php7-mcrypt php7-soap php7-openssl php7-gmp php7-pdo_odbc \
            php7-json php7-dom php7-pdo php7-zip php7-mysqli php7-zlib \
            php7-sqlite3 php7-apcu php7-pdo_pgsql php7-bcmath php7-gd \
            php7-odbc php7-pdo_mysql php7-pdo_sqlite php7-gettext \
            php7-xmlreader php7-xmlrpc php7-bz2 php7-session \
            php7-iconv php7-pdo_dblib php7-curl php7-ctype php7-phar \
            php7-tokenizer php7-xmlwriter php7-fileinfo php7-simplexml \
            php7-mbstring php7-xml php7-opcache php7-memcached php7-intl

# Git & curl (for Composer)
RUN apk add git curl

# Nano (in case of)
RUN apk add nano

# Adding Composer CLI
RUN curl -sS https://getcomposer.org/installer \
    | php -- --install-dir=/usr/local/bin --filename=composer

# Adding Prestissimo to speed up Composer
RUN composer global require hirak/prestissimo

# Preparing www
RUN adduser -D -u 1000 -g www www
RUN mkdir -p /run/nginx /www
RUN chown -R www:www /run/nginx /var/tmp /www

# Adding gosu for running tasks as www
RUN apk add gosu --no-cache --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/

# Cleaning
RUN rm -rf /tmp/* /var/cache/apk/*

# Exposing the port
EXPOSE 80
