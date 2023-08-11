-- 

DROP PROCEDURE IF EXISTS like_offer;
DELIMITER $
CREATE PROCEDURE like_offer(IN off_id MEDIUMINT UNSIGNED, IN rater_id SMALLINT UNSIGNED)
BEGIN
DECLARE cus_id SMALLINT UNSIGNED;
DECLARE already_rated TINYINT UNSIGNED;
SELECT COUNT(rate_value) INTO already_rated FROM offer_rating WHERE customer_id = rater_id AND offer_id = off_id;
IF (already_rated = 0) THEN
UPDATE offer SET number_of_likes = number_of_likes + 1 WHERE offer_id = off_id;
SELECT author_id INTO cus_id FROM offer WHERE offer_id = off_id;
UPDATE customer SET current_score = current_score + 5, overall_score = overall_score + 5 WHERE customer_id = cus_id;
INSERT INTO offer_rating (offer_id, customer_id, rate_value) VALUES (off_id, rater_id, 'LIKE');
ELSE
DELETE FROM offer_rating WHERE customer_id = rater_id AND offer_id = off_id;
END IF;
END$
DELIMITER ;
