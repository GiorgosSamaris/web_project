DROP PROCEDURE IF EXISTS randomize_prices_procedure;
DELIMITER $
CREATE PROCEDURE randomize_prices_procedure()
BEGIN
UPDATE inventory AS i
JOIN price_history AS ph ON i.product_id = ph.product_id
SET i.inventory_price = ROUND(0.85 * ph.average_price + RAND() * (1.15 * ph.average_price - 0.85 * ph.average_price), 2)
WHERE ph.price_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY);
END$
DELIMITER ;
