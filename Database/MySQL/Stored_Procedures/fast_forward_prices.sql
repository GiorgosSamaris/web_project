DROP PROCEDURE IF EXISTS fast_forward_prices;
DELIMITER $
CREATE PROCEDURE fast_forward_prices(IN intrvl INT)
BEGIN
UPDATE inventory AS i
JOIN price_history AS ph ON i.product_id = ph.product_id
SET i.inventory_price = ROUND(0.85 * ph.average_price + RAND() * (1.15 * ph.average_price - 0.85 * ph.average_price), 2)
WHERE ph.price_date = DATE_SUB(DATE_ADD(CURDATE(), INTERVAL intrvl DAY), INTERVAL 1 DAY);
INSERT INTO price_history (product_id, price_date, average_price)
SELECT
  product_id,
  DATE_ADD(CURDATE(), INTERVAL intrvl DAY) AS price_date,
  ROUND(AVG(inventory_price),2) AS average_price
FROM inventory
GROUP BY product_id;
END$
DELIMITER ;
