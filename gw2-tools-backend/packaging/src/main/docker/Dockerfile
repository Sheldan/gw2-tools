FROM amazoncorretto:21.0.1-alpine3.18
MAINTAINER Sheldan
VOLUME /tmp
ADD config/* /config/
ADD wrapper/*.sh /
RUN chmod +x /start.sh
ADD tools/app.jar /app.jar
CMD ["/start.sh"]