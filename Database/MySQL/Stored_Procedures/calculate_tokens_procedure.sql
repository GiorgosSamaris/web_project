DROP PROCEDURE IF EXISTS calculate_tokens_procedure;
DELIMITER $
CREATE PROCEDURE calculate_tokens_procedure()
BEGIN
DECLARE tokens_pool INT;
DECLARE score_sum INT;
SELECT COUNT(*) FROM customer INNER JOIN user ON customer_id = user_id WHERE user.register_date <= DATE_SUB(NOW(), INTERVAL 1 MONTH) INTO tokens_pool;
SET tokens_pool = ROUND((tokens_pool * 0.8), 0);
SELECT SUM(current_score) FROM customer INTO score_sum;
UPDATE customer SET overall_tokens = overall_tokens + ROUND(((score_sum/current_score)*tokens_pool),0), current_score = 0 WHERE current_score > 0;
UPDATE customer SET last_months_tokens = ROUND(((score_sum/current_score)*tokens_pool),0) WHERE current_score > 0;
END$
DELIMITER ;
