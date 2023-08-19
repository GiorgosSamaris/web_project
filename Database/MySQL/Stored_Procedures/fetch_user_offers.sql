DROP PROCEDURE IF EXISTS fetch_user_offers;
DELIMITER $
CREATE PROCEDURE fetch_user_offers(IN id SMALLINT UNSIGNED)
BEGIN
    SELECT * FROM offer WHERE author_id = id ORDER BY creation_date DESC;
END$
DELIMITER ;