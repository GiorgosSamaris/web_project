-- Registers a new customer
-- 

DROP PROCEDURE IF EXISTS register_customer;
DELIMITER $
CREATE PROCEDURE register_customer(IN usrnm VARCHAR(45), IN email VARCHAR(45), IN passwrd VARCHAR(45))
BEGIN
INSERT INTO user( `email`,`password`) VALUES(email, passwrd);
INSERT INTO customer(`customer_id`, `username`) VALUES(LAST_INSERT_ID(), usrnm);
END$
DELIMITER ;
