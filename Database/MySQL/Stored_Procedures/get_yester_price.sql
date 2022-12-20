-- Returns yesterday's average price for a given product_id
-- 

DROP PROCEDURE IF EXISTS get_yester_price;
DELIMITER $
CREATE PROCEDURE get_yester_price(IN pro_id SMALLINT, OUT price DECIMAL(3,2))
BEGIN

SELECT average_price INTO price
FROM price_history
WHERE product_id = pro_id AND price_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY);

END$
DELIMITER ;
