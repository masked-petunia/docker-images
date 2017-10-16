#!/bin/sh

HOST=''

if [ -z "$HOST" ]; then
  echo "/!\\ HOSTNAME NOT SET"
else
  #if [ "$HOST" == "$HOSTNAME" ]; then
    #echo "/!\\ CANNOT RUN ON HOST"
  #else
  docker exec ${HOST} sh -c "$@"
fi
