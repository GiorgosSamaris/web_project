-- 

DROP PROCEDURE IF EXISTS dislike_offer;
DELIMITER $
CREATE PROCEDURE dislike_offer(IN off_id MEDIUMINT UNSIGNED)
BEGIN
DECLARE cus_id SMALLINT UNSIGNED;
UPDATE offer SET number_of_dislikes = number_of_dislikes + 1 WHERE offer_id = off_id;
SELECT customer_id INTO cus_id FROM offer WHERE offer_id = off_id;
UPDATE customer SET current_score = current_score - 1 , overall_score = overall_score - 1 WHERE customer_id = cus_id;
END$
DELIMITER ;
