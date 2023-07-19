DROP EVENT IF EXISTS calculate_tokens;

-- Calculates tokens for each customer and resets customer.current_score

DELIMITER $
CREATE EVENT calculate_tokens
ON SCHEDULE EVERY 1 MONTH 
STARTS '2023-08-01 00:00:00'
COMMENT 'Calculates tokens for each customer and resets customer.current_score'
DO 
BEGIN
DECLARE tokens_pool INT;
DECLARE score_sum INT;
SELECT COUNT(*) FROM customer INNER JOIN user ON customer_id = user_id WHERE user.register_date <= DATE_SUB(NOW(), INTERVAL 1 MONTH) INTO tokens_pool;
SET tokens_pool = ROUND((tokens_pool * 0.8), 0);
SELECT SUM(current_score) FROM customer INTO score_sum;
UPDATE customer SET tokens = tokens + ROUND(((score_sum/current_score)*tokens_pool),0), current_score = 0;
END$

DELIMITER ;
