FROM python:3.12.7-slim-bookworm AS python-base

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
RUN pip install -r requirements.txt
COPY . ./

EXPOSE 8080
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8080"]