#!/bin/sh

NAME=bmct-captive-portal

docker stop $NAME || true && docker rm $NAME || true

docker run -d \
    --env-file $(dirname $0)/.env \
    --name $NAME \
    --network host \
    n4zim/images:bmct-captive-portal
