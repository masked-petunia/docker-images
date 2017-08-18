FROM n4zim/php-projects:fpm

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Java
RUN apk add --update openjdk8-jre-base

# NodeJS
RUN apk add --update nodejs nodejs-npm

# NodeJS dependencies
RUN npm install -g bower less

# Adding Symfony CLI
#RUN curl -LsS https://symfony.com/installer -o /usr/local/bin/symfony \
# && chmod a+x /usr/local/bin/symfony
