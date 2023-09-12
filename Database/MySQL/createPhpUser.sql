DROP USER IF EXISTS 'phpClient'@'localhost';
CREATE USER 'phpClient'@'localhost' IDENTIFIED BY '$0ftK1ngsPhP';
GRANT FILE ON *.* TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.product TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.category TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.subcategory TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.price_history TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.store TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.temp_product TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.temp_price TO 'phpClient'@'localhost';
GRANT SELECT ON gocart.customer TO 'phpClient'@'localhost';
GRANT SELECT ON gocart.user TO 'phpClient'@'localhost';
GRANT SELECT ON gocart.offer TO 'phpClient'@'localhost';
GRANT SELECT ON gocart.product TO 'phpClient'@'localhost';
GRANT SELECT ON gocart.subcategory TO 'phpClient'@'localhost';
GRANT SELECT ON gocart.category TO 'phpClient'@'localhost';
GRANT SELECT ON gocart.inventory TO 'phpClient'@'localhost';
GRANT UPDATE ON gocart.store TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.temp_subcategory TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.temp_product TO 'phpClient'@'localhost';
GRANT INSERT ON gocart.temp_category TO 'phpClient'@'localhost';

GRANT SELECT ON gocart.store TO 'phpClient'@'localhost';
grant execute on gocart.* to 'phpClient'@'localhost';
