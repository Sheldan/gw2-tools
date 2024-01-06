FROM python:3.12.1-alpine3.19
ADD wrapper /
ADD python/requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD resources/ /python/resources
ADD python /python
CMD ["/run.sh"]