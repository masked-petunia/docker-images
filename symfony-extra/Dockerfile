FROM n4zim/images:symfony

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Update repository
RUN apk update && apk upgrade

# -----------------------------------------------------------------------------------------
# php
# -----------------------------------------------------------------------------------------

# PHP extensions
RUN apk add php7-imagick
 
# GD lib & Imagemagick
RUN apk add coreutils freetype-dev libjpeg-turbo-dev libltdl libmcrypt-dev \
            libpng-dev imagemagick

# -----------------------------------------------------------------------------------------
# wkhtmltopdf
# -----------------------------------------------------------------------------------------

RUN apk add --no-cache xvfb ttf-freefont fontconfig dbus

# Install wkhtmltopdf from "testing" repository
RUN apk add qt5-qtbase-dev \
    wkhtmltopdf \
    --no-cache \
    --repository http://dl-3.alpinelinux.org/alpine/edge/testing/ \
    --allow-untrusted

# Wrapper for xvfb
RUN mv /usr/bin/wkhtmltopdf /usr/bin/wkhtmltopdf-origin
RUN echo $'#!/usr/bin/env sh\n\
Xvfb :0 -screen 0 1024x768x24 -ac +extension GLX +render -noreset & \n\
DISPLAY=:0.0 wkhtmltopdf-origin $@ \n\
killall Xvfb\
' > /usr/bin/wkhtmltopdf

RUN chmod +x /usr/bin/wkhtmltopdf

# -----------------------------------------------------------------------------------------

# Java
RUN apk add --update openjdk8-jre-base

# NodeJS
RUN apk add --update nodejs nodejs-npm

# NodeJS packages
RUN npm install -g bower yarn less

# -----------------------------------------------------------------------------------------

# Cleaning
RUN rm -rf /tmp/* /var/cache/apk/*
