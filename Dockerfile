FROM centos/nodejs-8-centos7:latest
MAINTAINER Nazim Lachter <nlachter@gmail.com>

RUN yum -y install epel-release
RUN yum -y install arp-scan
RUN yum -y clean all
