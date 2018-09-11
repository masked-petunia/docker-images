#!/bin/bash

echo "## Captive Portal Auto-Connect ##"

connect() {
  date=$(date +'%m/%d/%y %H:%M:%S')
  if command -v curl > /dev/null 2>&1 ; then
    echo "-> Sending request using cURL ($date)"

    curl --silent --insecure --max-time $CAPTIVE_TIMEOUT -o /dev/null \
      -X POST -d "$CAPTIVE_DATA" "$CAPTIVE_URL"
  else
    echo "-> Sending request using wget ($date)"
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

if [[ -z "${CAPTIVE_LOOP}" ]]; then
  connect
  check
else
  while true; do
    echo "-------------------------------------------------"
    connect
    check
    sleep $CAPTIVE_LOOP
  done
fi
