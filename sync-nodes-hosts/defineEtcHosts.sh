#!/bin/bash

if [ "$#" -ne 3 ] ; then
    echo 'Too few arguments supplied'
    exit 1
fi

NODE_IP=$1
NODE_NAME=$2
CLUSTER_DOMAIN=$3

NODE_DOMAIN=$NODE_NAME.$CLUSTER_DOMAIN

echo "Node \"$NODE_NAME\" from \"$CLUSTER_DOMAIN\" set to $NODE_IP"
if grep -rnw /etc/hosts -e "$NODE_DOMAIN" > /dev/null ; then
  echo "-> Updating record on /etc/hosts..."
  sed -i "s/^.*"$NODE_DOMAIN".*$/"$NODE_IP" "$NODE_DOMAIN"/" /etc/hosts
else
  echo "-> New record on /etc/hosts"
  echo "$NODE_IP $NODE_DOMAIN" >> /etc/hosts
fi
