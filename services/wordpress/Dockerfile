FROM wordpress:php8.2-apache

RUN apt-get update \
   && apt-get -y install vim wget zip unzip less default-mysql-client msmtp msmtp-mta \
   && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
   && composer --version

RUN docker-php-ext-install pdo_mysql

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp \
    && wp --info

COPY entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]