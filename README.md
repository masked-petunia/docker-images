# Docker Minimal Debian PHP
Minimal setup on Debian with Nginx, PHP7, Composer and some other dependencies

:warning: If you want to use this repo, you need to finish the setup :

1. Copy your own nginx config file : ```ADD site.conf /etc/nginx/conf.d/```
2. You can also set a PHP.ini : ```ADD php.ini /etc/php/7.0/fpm/php.ini```
3. Copy your app code ```COPY . /var/www/```
4. Run Composer : ```RUN cd /var/www && composer install --no-interaction```
5. ... and anything needed by your app...

After that, launch everything or use supervisor which is included
