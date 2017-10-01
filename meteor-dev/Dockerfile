FROM debian:latest
MAINTAINER Nazim Lachter <nlachter@gmail.com>

# Dependencies
RUN apt-get update
RUN apt-get install -y curl gnupg gosu

# NodeJS
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

# App user
RUN useradd --create-home --shell /bin/bash --groups root app

# Meteor
RUN curl https://install.meteor.com/ | gosu app sh
ENV METEOR /home/app/.meteor/meteor

# Finish
EXPOSE 3000
ADD run.sh /
CMD /run.sh
