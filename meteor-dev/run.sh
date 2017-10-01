#!/bin/bash

cd /app
chown app:app -R .

# Meteor Update
echo "# METEOR UPDATE..."
gosu app ${METEOR} update --packages-only

# NodeJS deps
echo "# NPM UPDATE..."
gosu app ${METEOR} npm update

# Start Meteor in development mode
echo "# SERVER..."
if [ -f settings.json ]; then RUN_PARAMS="--settings settings.json"; else RUN_PARAMS=""; fi
gosu app ${METEOR} ${RUN_PARAMS}

exec "$@"
