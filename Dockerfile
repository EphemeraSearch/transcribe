FROM php:alpine
WORKDIR /src
COPY . .
CMD php -S 0.0.0.0:8000
EXPOSE 8000
