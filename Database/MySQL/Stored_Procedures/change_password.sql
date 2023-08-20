DROP PROCEDURE IF EXISTS change_password;
DELIMITER $
CREATE PROCEDURE change_password(IN n_password VARCHAR(45), IN id SMALLINT UNSIGNED)
BEGIN
    DECLARE password_same SMALLINT UNSIGNED;
    SELECT COUNT(*) INTO password_same FROM user WHERE password = n_password AND user_id = id;
    IF (password_same = 0) THEN
        UPDATE user SET password = n_password WHERE user_id = id;
        SELECT "1";
    ELSE
        SELECT "0"; #new password same as old
    END IF;
END$
DELIMITER ;