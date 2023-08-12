DROP EVENT IF EXISTS randomize_prices;

-- Randomly sets inventory.price as X * yesterday's average where x IN [0.85, 1.15] and updates price_history table

DELIMITER $
CREATE EVENT randomize_prices
ON SCHEDULE EVERY 1 DAY 
STARTS '2023-08-12 01:00:00'
COMMENT 'Randomly sets inventory.price as X * yesterdays average where x IN [0.85, 1.15] and updates price_history table'
DO 
BEGIN
CALL randomize_prices_procedure();
CALL daily_average_procedure();
END$

DELIMITER ;
