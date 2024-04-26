#!/bin/bash

wp db export /var/www/html/portal/wordpress.sql --allow-root
cd /var/www/html/wp-content/ && zip -r /var/www/html/portal/uploads.zip uploads