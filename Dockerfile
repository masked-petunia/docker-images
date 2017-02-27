FROM debian:latest

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Main dependencies
RUN apt-get update && apt-get install -y --force-yes --no-install-recommends \
    ca-certificates \
    curl \
    wget

# External packages
RUN curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
RUN echo "deb http://packages.dotdeb.org jessie all" > /etc/apt/sources.list.d/dotdeb.list # For PHP 7 FPM
RUN wget https://www.dotdeb.org/dotdeb.gpg -P /tmp/ && apt-key add /tmp/dotdeb.gpg

# Other dependencies
RUN apt-get update && apt-get install -y --force-yes --no-install-recommends \
    git \
    nginx \
    php7.0-fpm \
    nodejs \
    npm \
    imagemagick \
    libmagickwand-dev \
    supervisor

# NodeJS dependencies
RUN npm install -g \
    bower \
    less

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Empty www folder
RUN rm -r /var/www/*

# Open Ports
EXPOSE 80

# Clean
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
