DROP EVENT IF EXISTS update_price_decrease;

DELIMITER $
CREATE EVENT update_price_decrease
ON SCHEDULE EVERY 1 DAY
STARTS '2023-09-10 00:04:00'
COMMENT 'Updates flags for offers that have a price decrease'
DO 
BEGIN
CALL update_price_decrease_procedure();
END$

DELIMITER ;
