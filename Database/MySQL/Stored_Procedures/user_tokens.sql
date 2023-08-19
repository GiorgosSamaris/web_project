DROP PROCEDURE IF EXISTS user_tokens;
DELIMITER $
CREATE PROCEDURE user_tokens(IN id SMALLINT UNSIGNED)
BEGIN
    SELECT this_months_tokens, overall_tokens FROM customer WHERE customer_id = id;
END$
DELIMITER ;