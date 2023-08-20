-- SQLBook: Code
DROP PROCEDURE IF EXISTS change_username;
DELIMITER $
CREATE PROCEDURE change_username(IN n_username VARCHAR(45), IN id SMALLINT UNSIGNED)
BEGIN
    DECLARE username_exists SMALLINT UNSIGNED;
    SELECT COUNT(*) INTO username_exists FROM user WHERE username = n_username;
    IF (username_exists = 0) THEN
        UPDATE user SET username = n_username WHERE user_id = id;
        SELECT "1";
    ELSE
        SELECT "0"; #user already_exitsts
    END IF;
END$
DELIMITER ;