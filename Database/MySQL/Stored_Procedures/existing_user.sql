-- Returns 1 if customer.username || user.email already exist else 0
-- 
DROP PROCEDURE IF EXISTS existing_user;
DELIMITER $
CREATE PROCEDURE existing_user(IN usrnm VARCHAR(45), IN email VARCHAR(45), OUT existing BOOLEAN)
BEGIN
SELECT EXISTS(SELECT * FROM user LEFT JOIN customer ON customer_id = user_id WHERE username LIKE usrnm OR customer.email LIKE email) INTO existing;
END$
DELIMITER ;
