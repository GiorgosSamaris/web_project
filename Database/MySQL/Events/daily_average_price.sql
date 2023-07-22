DROP EVENT IF EXISTS daily_average_price;

-- Calculates daily average price for each product and deletes old entries (>8days)

DELIMITER $
CREATE EVENT daily_average_price
ON SCHEDULE EVERY 1 DAY 
STARTS '2023-07-22 03:00:00'
COMMENT 'Calculates daily average price for each product and deletes old entries (>8days)'
DO 
BEGIN
CALL daily_average_procedure();
END$

DELIMITER ;
