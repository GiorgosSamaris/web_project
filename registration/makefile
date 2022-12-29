
move: check_directories
	cp login_registration.html /var/www/gocart/index
	cp log_reg.js /var/www/gocart/index
	cp log_reg.css /var/www/gocart/index
	

check_directories: 
ifeq (,$(wildcard /var/www/gocart/index))
	@echo "directory does not exist, creating..."
	mkdir /var/www/gocart/index
else 
	@echo "index directory exists, skipping..."

endif