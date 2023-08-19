DROP PROCEDURE IF EXISTS user_score;
DELIMITER $
CREATE PROCEDURE user_score(IN id SMALLINT UNSIGNED)
BEGIN
    SELECT current_score, overall_score FROM customer WHERE customer_id = id;
END$
DELIMITER ;