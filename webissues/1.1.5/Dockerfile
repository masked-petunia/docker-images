FROM php:5-apache

# Dependencies
RUN apt-get update
RUN apt-get install -y libpq-dev firebird-dev libc-client-dev libkrb5-dev
RUN rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pgsql
RUN docker-php-ext-install interbase
RUN docker-php-ext-install mbstring
RUN docker-php-ext-configure imap --with-kerberos --with-imap-ssl && docker-php-ext-install imap

# Files
COPY webissues-server-1.1.5/ /var/www/html/
RUN chown -R www-data:www-data /var/www/html
