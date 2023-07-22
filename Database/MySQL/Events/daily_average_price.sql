DROP EVENT IF EXISTS daily_average_price;

-- Calculates daily average price for each product and deletes old entries (>8days)

DELIMITER $
CREATE EVENT daily_average_price
ON SCHEDULE EVERY 1 DAY 
STARTS '2023-07-22 03:00:00'
COMMENT 'Calculates daily average price for each product and deletes old entries (>8days)'
DO 
BEGIN
INSERT INTO price_history (product_id, price_date, average_price)
SELECT
  product_id,
  CURDATE() AS price_date,
  AVG(inventory_price) AS average_price
FROM inventory
GROUP BY product_id;
END$

DELIMITER ;
