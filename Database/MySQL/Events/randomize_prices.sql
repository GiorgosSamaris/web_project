-- SELECT 0.85 + RAND() * (1.15 - 0.85) AS random_float;
DROP EVENT IF EXISTS randomize_prices;

-- Randomly sets inventory.price as X * yesterday's average where x IN [0.85, 1.15]

DELIMITER $
CREATE EVENT randomize_prices
ON SCHEDULE EVERY 1 DAY 
STARTS '2023-07-22 01:00:00'
COMMENT 'Randomly sets inventory.price as X * yesterdays average where x IN [0.85, 1.15]'
DO 
BEGIN
  UPDATE inventory AS i
  JOIN price_history AS ph ON i.product_id = ph.product_id
  SET i.inventory_price = ROUND(0.85 * ph.average_price + RAND() * (1.15 * ph.average_price - 0.85 * ph.average_price), 2)
  WHERE ph.price_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY);
END$

DELIMITER ;
