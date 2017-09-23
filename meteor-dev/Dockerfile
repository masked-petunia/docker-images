FROM debian:latest

MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Update repository
RUN apt-get update

# Curl, gnupg #gosu
RUN apt-get install -y curl gnupg

# NodeJS
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

# Meteor
RUN curl https://install.meteor.com/ | sh

# New app user
#RUN useradd -ms /bin/bash app

# Entrypoint
ADD run.sh /run.sh
#RUN chown app:app /run.sh

# App dir
#RUN mkdir /app
#RUN chown app:app /app

# Last things
WORKDIR /app
EXPOSE 3000
#USER app
ENTRYPOINT [ "/run.sh" ]
