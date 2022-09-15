FROM python:3.9.13

RUN mkdir /app
COPY ./requirements.txt /app
WORKDIR /app

RUN pip install --upgrade pip
RUN apt-get update -y
RUN apt-get -y install libgl1-mesa-glx
RUN pip install -r requirements.txt