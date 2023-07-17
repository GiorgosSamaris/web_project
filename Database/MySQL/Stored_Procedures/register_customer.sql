-- Registers a new customer
-- 

DROP PROCEDURE IF EXISTS register_customer;
DELIMITER $
CREATE PROCEDURE register_customer(IN usrnm VARCHAR(45), IN email VARCHAR(45), IN passwrd VARCHAR(45))
BEGIN
INSERT INTO user( `username`,`password`) VALUES(usrnm, passwrd);
INSERT INTO customer(`customer_id`, `email`) VALUES(LAST_INSERT_ID(), email);
END$
DELIMITER ;
