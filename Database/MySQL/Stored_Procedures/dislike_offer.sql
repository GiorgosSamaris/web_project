DROP PROCEDURE IF EXISTS dislike_offer;
DELIMITER $
CREATE PROCEDURE dislike_offer(IN off_id MEDIUMINT UNSIGNED, IN rater_id SMALLINT UNSIGNED)
BEGIN
    DECLARE current_score_value INT; 
    DECLARE overall_score_value INT; 
    DECLARE cus_id SMALLINT UNSIGNED;
    DECLARE already_liked TINYINT UNSIGNED;
    DECLARE already_disliked TINYINT UNSIGNED;
    SET current_score_value = 0;
    SET overall_score_value = 0;
    SET cus_id = 0;
    SET already_liked = 0;
    SET already_disliked = 0;

-- fetch required data
    SELECT author_id FROM offer WHERE offer_id = off_id INTO cus_id;
    SELECT current_score, overall_score FROM customer WHERE customer_id = cus_id INTO current_score_value, overall_score_value;
    SELECT COUNT(rate_value) FROM offer_rating WHERE customer_id = rater_id AND offer_id = off_id AND rate_value = 'DISLIKE' INTO already_disliked;
    SELECT COUNT(rate_value) FROM offer_rating WHERE customer_id = rater_id AND offer_id = off_id AND rate_value = 'LIKE' INTO already_liked;


    -- delete like update score
    IF(already_liked > 0) THEN 
        -- remove like
        DELETE FROM offer_rating WHERE customer_id = rater_id AND offer_id = off_id;
        UPDATE offer SET number_of_likes = number_of_likes - 1 WHERE offer_id = off_id;
        -- update score respecting score  > 0
        IF current_score_value > 4 THEN
          SET current_score_value = current_score_value - 5;
  	    ELSE 
  		    SET current_score_value = 0;	
        END IF;
        IF overall_score_value > 4 THEN
            SET overall_score_value = overall_score_value - 5;
  	    ELSE 
  		    SET current_score_value = 0;
        END IF;
        UPDATE customer SET current_score = current_score_value, overall_score = overall_score_value WHERE customer_id = cus_id;
    END IF;

    -- insert dislike, update score
    -- else if should be used instead of if
	IF (already_disliked = 0) THEN
        UPDATE offer SET number_of_dislikes = number_of_dislikes + 1 WHERE offer_id = off_id;
        SELECT author_id INTO cus_id FROM offer WHERE offer_id = off_id;
        IF current_score_value > 0 THEN
            SET current_score_value = current_score_value - 1;
        END IF;
        IF overall_score_value > 0 THEN
            SET overall_score_value = overall_score_value - 1;
        END IF;
    
        UPDATE customer SET current_score = current_score_value, overall_score = overall_score_value WHERE customer_id = cus_id;
        INSERT INTO offer_rating (offer_id, customer_id, rate_value) VALUES (off_id, rater_id, 'DISLIKE');
    
    -- delete dislike, update score
    ELSE 
	    UPDATE offer SET number_of_dislikes = number_of_dislikes - 1 WHERE offer_id = off_id;
        UPDATE customer SET current_score = current_score + 1, overall_score = overall_score + 1 WHERE customer_id = cus_id;
        DELETE FROM offer_rating WHERE customer_id = rater_id AND offer_id = off_id;
	END IF;
END$
DELIMITER ;
