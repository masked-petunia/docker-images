FROM debian:latest

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Main dependencies
RUN apt-get update && apt-get install -y --force-yes --no-install-recommends \
    ca-certificates \
    curl \
    wget

# For PHP 7 FPM
RUN echo "deb http://packages.dotdeb.org jessie all" > /etc/apt/sources.list.d/dotdeb.list
RUN wget https://www.dotdeb.org/dotdeb.gpg -P /tmp/ && apt-key add /tmp/dotdeb.gpg

# NodeJS (includes an "apt-get update" at the end)
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -

# Other dependencies
RUN apt-get install -y --force-yes --no-install-recommends \
    git \
    nginx \
    php7.0-fpm \
    nodejs \
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
