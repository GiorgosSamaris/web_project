-- SQLBook: Code
DROP EVENT IF EXISTS calculate_tokens;

-- Calculates tokens for each customer and resets customer.current_score

DELIMITER $
CREATE EVENT calculate_tokens
ON SCHEDULE EVERY 1 MONTH 
STARTS '2023-09-01 00:00:00'
COMMENT 'Calculates tokens for each customer and resets customer.current_score'
DO 
BEGIN
CALL calculate_tokens_procedure();
END$

DELIMITER ;
