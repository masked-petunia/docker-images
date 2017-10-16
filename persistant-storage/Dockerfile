FROM alpine:latest

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Shared directories
RUN mkdir -p /opt/dps/shared/sessions /opt/dps/shared/logs

# Cache
RUN mkdir -p /opt/dps/cache/bower /opt/dps/cache/composer /opt/dps/cache/css /opt/dps/cache/js

# Current dir
RUN mkdir /opt/dps/current
WORKDIR /opt/dps/current

# Scripts
ADD start.sh /opt/dps
RUN chmod +x /opt/dps/start.sh
ADD exec.sh /opt/dps/bin/
RUN chmod +x /opt/dps/bin/exec.sh

# Permissions
RUN chown -R www:www /opt/dps

# Starting
ENTRYPOINT /opt/dps/start.sh /bin/sh
