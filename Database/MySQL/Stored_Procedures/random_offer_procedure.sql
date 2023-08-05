-- selects a random customer, random store random product and creates a new offer
DROP PROCEDURE IF EXISTS random_offer_procedure;

DELIMITER $
CREATE PROCEDURE random_offer_procedure()
BEGIN
    DECLARE prod_id SMALLINT UNSIGNED;
    DECLARE sto_id TINYINT UNSIGNED;
    DECLARE cust_id SMALLINT UNSIGNED;
    DECLARE price DECIMAL(4,2);
    -- fetch required values
    SELECT store_id, product_id FROM inventory ORDER BY RAND() LIMIT 1 INTO sto_id, prod_id;
    SELECT customer_id FROM customer ORDER BY RAND() LIMIT 1 INTO cust_id;
    SELECT average_price FROM price_history WHERE product_id = prod_id ORDER BY RAND() LIMIT 1 INTO price;
    -- assign a random discount (15%, 30%)
    SET price = ROUND(price * (0.70 + (RAND() * 0.15)), 2);
    -- finally insert new offer and award potential score
    CALL new_offer(prod_id, sto_id, cust_id, price);
END$
DELIMITER ;