FROM n4zim/images:symfony-alpine

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Structure
WORKDIR /opt/dps

# Cache
RUN mkdir -p cache/bower cache/composer cache/css cache/js

# Shared directories
RUN mkdir -p shared/sessions shared/logs

# Scripts
ADD start.sh /opt/dps
RUN chmod +x /opt/dps/start.sh
ADD run.sh bin/
RUN chmod +x bin/run.sh

# Permissions
RUN chown -R www:www .

# Starting
ENTRYPOINT /opt/dps/start.sh /bin/sh
