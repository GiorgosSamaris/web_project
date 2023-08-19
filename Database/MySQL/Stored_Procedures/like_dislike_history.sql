DROP PROCEDURE IF EXISTS like_dislike_history;
DELIMITER $
CREATE PROCEDURE like_dislike_history(IN id SMALLINT UNSIGNED)
BEGIN
    SELECT * FROM offer_rating WHERE customer_id = id ORDER BY rating_date DESC;
END$
DELIMITER ;