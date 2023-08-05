DROP PROCEDURE IF EXISTS dislike_offer;
DELIMITER $
CREATE PROCEDURE dislike_offer(IN off_id MEDIUMINT UNSIGNED, IN rater_id SMALLINT UNSIGNED)
BEGIN
    DECLARE cus_id SMALLINT UNSIGNED;
    DECLARE current_score_value INT; 
    DECLARE overall_score_value INT; 
    
    UPDATE offer SET number_of_dislikes = number_of_dislikes + 1 WHERE offer_id = off_id;
    SELECT author_id INTO cus_id FROM offer WHERE offer_id = off_id;
    
    SELECT current_score, overall_score INTO current_score_value, overall_score_value FROM customer WHERE customer_id = cus_id;
    
    IF current_score_value > 0 THEN
        SET current_score_value = current_score_value - 1;
    END IF;
    
    IF overall_score_value > 0 THEN
        SET overall_score_value = overall_score_value - 1;
    END IF;
    
    UPDATE customer SET current_score = current_score_value, overall_score = overall_score_value WHERE customer_id = cus_id;
    INSERT INTO offer_rating (offer_id, customer_id, rate_value) VALUES (off_id, rater_id, 'DISLIKE');
END$
DELIMITER ;
