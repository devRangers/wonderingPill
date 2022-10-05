FROM python:3.9.13

RUN mkdir /app
WORKDIR /app
COPY ./requirements.txt /app

RUN pip install --upgrade pip
COPY . /app
RUN apt-get update -y
RUN apt-get -y install libgl1-mesa-glx
COPY . /app
RUN pip install -r requirements.txt
COPY . /app