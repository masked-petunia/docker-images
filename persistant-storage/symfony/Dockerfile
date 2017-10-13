FROM n4zim/images:symfony-alpine

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Structure
WORKDIR /opt/dps

# Cache
RUN mkdir -p cache/bower cache/composer cache/css cache/js

# Symfony
RUN mkdir -p shared/sessions shared/logs
ADD run.sh bin/

# Permissions
RUN adduser -D -u 1000 -g app app
RUN chown -R app:app .
