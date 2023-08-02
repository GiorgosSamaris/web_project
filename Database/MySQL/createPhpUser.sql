DROP USER IF EXISTS 'phpClient'@'localhost';
CREATE USER 'phpClient'@'localhost' IDENTIFIED BY '$0ftK1ngsPhP';
GRANT FILE ON *.* TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.product TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.category TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.subcategory TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.price_history TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.store TO 'phpClient'@'localhost';

grant execute on GoCart.* to 'phpClient'@'localhost';
