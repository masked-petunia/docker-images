#!/bin/sh

cd /app

# Meteor Update
meteor update

# NodeJS deps
meteor npm update

# Start Meteor in development mode
meteor ${RUN_PARAMS}

exec "$@"
