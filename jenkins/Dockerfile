FROM jenkins/jenkins

MAINTAINER Nazim Lachter <nlachter@gmail.com>

USER root
RUN apt-get update

# Sudo
RUN apt-get install -y sudo
RUN rm -rf /var/lib/apt/lists/*
RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

USER jenkins
COPY plugins.txt /usr/share/jenkins/plugins-docker.txt
RUN /usr/local/bin/plugins.sh /usr/share/jenkins/plugins-docker.txt
