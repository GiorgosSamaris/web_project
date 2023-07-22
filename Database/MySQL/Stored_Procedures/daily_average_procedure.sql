DROP PROCEDURE IF EXISTS daily_average_procedure;
DELIMITER $
CREATE PROCEDURE daily_average_procedure()
BEGIN
INSERT INTO price_history (product_id, price_date, average_price)
SELECT
  product_id,
  CURDATE() AS price_date,
  ROUND(AVG(inventory_price),2) AS average_price
FROM inventory
GROUP BY product_id;
END$
DELIMITER ;
