FROM php:8.1

RUN apt update && apt install -y openssl unzip zip git libonig-dev

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer

RUN docker-php-ext-install pdo  mbstring pdo_mysql bcmath

WORKDIR /app/Todo

COPY . .

RUN composer install

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0
