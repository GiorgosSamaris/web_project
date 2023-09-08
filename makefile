all: login_copy registration_copy maps_copy review_copy add_copy
	systemctl restart apache2
login_copy:
		cp -a login/. /var/www/gocart.net/html/login
registration_copy:
		cp -a registration/. /var/www/gocart.net/html/registration
maps_copy:
		cp -a maps/. /var/www/gocart.net/html/maps
review_copy:
		cp -a reviewOffer/. /var/www/gocart.net/html/reviewOffer
add_copy:
		cp -a addOffer/. /var/www/gocart.net/html/addOffer