DROP USER IF EXISTS 'phpClient'@'localhost';
CREATE USER 'phpClient'@'localhost' IDENTIFIED BY '$0ftK1ngsPhP';
GRANT INSERT ON GoCart.product TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.category TO 'phpClient'@'localhost';
GRANT INSERT ON GoCart.subcategory TO 'phpClient'@'localhost';
