FROM alpine:latest
LABEL MAINTAINER "Nazim Lachter <nlachter@gmail.com>"

ADD connect.sh /

RUN chmod +x /connect.sh

#CMD while true; do sh /connect.sh; sleep $CAPTIVE_LOOP; done
CMD sh /connect.sh
