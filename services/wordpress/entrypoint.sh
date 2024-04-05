#!/bin/bash

root_path="/var/www/html"
theme_path="$root_path/wp-content/themes/$WORDPRESS_THEME_NAME"
host="$WORDPRESS_DB_HOST"
port="$WORDPRESS_DB_PORT"

docker-entrypoint.sh apache2-foreground &

if [ ! -e "$root_path/index.php" ]; then
    echo "WordPress files not found. Installing WordPress..."

	echo "Waiting for mysql"
	until (echo >/dev/tcp/$host/$port) &>/dev/null
	do
  	>&2 echo -n "."
  	sleep 1
	done
	>&2 echo "MySQL is up - executing command"

	cd $root_path &

	#wp core download --locale=ja --allow-root
	wp config create --dbname=wordpress --dbuser=wordpress --dbpass=wordpress --allow-root
	wp core install --url=http://localhost:8080 --title="WordPress Site" --admin_user=admin --admin_password=password --admin_email=admin@example.com --allow-root

	wp option update permalink_structure "/%postname%/" --allow-root
	wp option update timezone_string "Asia/Tokyo" --allow-root

	wp language core install ja --allow-root
	wp site switch-language ja --allow-root

	cd $theme_path && composer install --no-plugins --no-scripts &

	cd $root_path && composer config --no-plugins allow-plugins.composer/installers true && composer install &
	#mv $root_path/vendor/wpengine/advanced-custom-fields-pro $root_path/wp-content/plugins/advanced-custom-fields-pro
fi


wait
