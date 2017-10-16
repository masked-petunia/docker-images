#!/bin/sh

echo "HOSTNAME is now ${HOSTNAME}"

sed -i -e "s/^HOST=.*$/HOST=$HOSTNAME/g" /opt/dps/bin/run.sh

exec "$@"
