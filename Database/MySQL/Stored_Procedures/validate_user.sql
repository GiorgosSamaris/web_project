-- Returns 1 if user.username && user.password exist in the same record else 0
-- 
DROP PROCEDURE IF EXISTS validate_user;
DELIMITER $
CREATE PROCEDURE validate_user(IN usrnm VARCHAR(45), IN passwrd VARCHAR(45))
BEGIN
DECLARE valid BOOLEAN;
DECLARE admn BOOLEAN;
DECLARE u_id BIGINT;
SET valid = FALSE;
set admn = FALSE;
SELECT EXISTS(SELECT isAdmin FROM user WHERE user.username LIKE usrnm AND user.password LIKE passwrd) INTO valid;
IF valid = 1 THEN
    SELECT isAdmin, user_id FROM user WHERE username LIKE usrnm AND password LIKE passwrd INTO admn, u_id;
END IF;
SELECT valid, admn, u_id;
END$
DELIMITER ;
