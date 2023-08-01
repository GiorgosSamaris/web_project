DROP PROCEDURE IF EXISTS flashback_to_present;
DELIMITER $
CREATE PROCEDURE flashback_to_present()
BEGIN
DELETE FROM price_history WHERE price_date > NOW();
END$
DELIMITER ;
