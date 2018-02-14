FROM php:5-apache

# Dependencies
RUN apt-get update
RUN apt-get install -y libpq-dev firebird-dev
RUN rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pgsql
RUN docker-php-ext-install interbase
RUN docker-php-ext-install mbstring

# Files
COPY webissues-server-1.1.5/ /var/www/html/
RUN chown -R www-data:www-data /var/www/html
