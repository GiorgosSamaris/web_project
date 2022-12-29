-- Returns 1 if user.username || user.password exist in the same record else 0
-- 
DROP PROCEDURE IF EXISTS validate_user;
DELIMITER $
CREATE PROCEDURE validate_user(IN usrnm VARCHAR(45), IN passwrd VARCHAR(45), OUT existing BOOLEAN)
BEGIN
SELECT EXISTS(SELECT * FROM user WHERE user.username LIKE usrnm AND user.password LIKE passwrd) INTO existing;
END$
DELIMITER ;
