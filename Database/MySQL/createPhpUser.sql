DROP USER IF EXISTS 'phpClient'@'localhost';
CREATE USER 'phpClient'@'localhost' IDENTIFIED BY '$0ftK1ngsPhP';
GRANT FILE ON *.* TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.product TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.category TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.subcategory TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.price_history TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.store TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.temp_table TO 'phpClient'@'localhost';
GRANT SELECT ON GoCart.customer TO 'phpClient'@'localhost';
GRANT SELECT ON GoCart.user TO 'phpClient'@'localhost';
GRANT SELECT ON GoCart.offer TO 'phpClient'@'localhost';
GRANT SELECT ON GoCart.product TO 'phpClient'@'localhost';
GRANT SELECT ON GoCart.subcategory TO 'phpClient'@'localhost';
GRANT SELECT ON GoCart.category TO 'phpClient'@'localhost';


GRANT SELECT ON GoCart.store TO 'phpClient'@'localhost';
grant execute on GoCart.* to 'phpClient'@'localhost';
