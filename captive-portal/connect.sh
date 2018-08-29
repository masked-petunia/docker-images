#!/bin/bash

echo "# Captive Portal Auto-Connect ($(date +'%m/%d/%y %H:%M:%S'))"

connect() {
  if command -v curl > /dev/null 2>&1 ; then
    echo "-> Sending request using cURL"
    curl --silent --insecure --max-time $CAPTIVE_TIMEOUT -o /dev/null \
      -X POST -d "$CAPTIVE_DATA" "$CAPTIVE_URL"
  else
    echo "-> Sending request using wget"
    wget --quiet --no-check-certificate -O /dev/null \
      -T $CAPTIVE_TIMEOUT --post-data "$CAPTIVE_DATA" "$CAPTIVE_URL"
  fi
}

check() {
  wget -q --spider http://google.com
  if [ $? -eq 0 ] ; then
    echo "** Internet is OK"
  else
    echo "** Internet is NOT CONNECTED, a new attempt will be made..."
    connect
    check
  fi
}

connect
check

echo "-------------------------------------------------"
